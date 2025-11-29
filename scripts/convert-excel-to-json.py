#!/usr/bin/env python3
"""
Convert LingXM Excel vocabulary files to JSON format.

The Excel files have a simple structure:
- Column 1: Word (header is first word)
- Column 2: Frequency count (header is first frequency)

Output JSON structure:
{
  "language": "de",
  "totalWords": 10000,
  "words": [
    {
      "id": 1,
      "word": "die",
      "frequency": 58062,
      "rank": 1,
      "difficulty": 1
    }
  ]
}
"""

import pandas as pd
import json
import os
import sys

# Configuration
INPUT_DIR = "/Users/eldiaploo/Desktop/panos folder/LingXM/06102015_v2/app/database/data/"
OUTPUT_DIR = "/Users/eldiaploo/Desktop/LingXM-Panos/public/data"

# File to language code mapping
FILE_MAPPING = {
    "db_EN_freq.xlsx": "en",
    "db_GER_freq.xlsx": "de",
    "db_FR_freq.xlsx": "fr",
    "db_SP_freq.xlsx": "es",
    "db_RU_freq.xlsx": "ru",
    "db_GR_freq.xlsx": "el",
    "db_POR_freq.xlsx": "pt",
    "db_TUR_freq.xlsx": "tr",
}

# Language names
LANGUAGE_NAMES = {
    "en": "English",
    "de": "German",
    "fr": "French",
    "es": "Spanish",
    "ru": "Russian",
    "el": "Greek",
    "pt": "Portuguese",
    "tr": "Turkish",
}


def calculate_difficulty(rank: int, total_words: int) -> int:
    """
    Calculate difficulty level (1-5) based on word frequency rank.

    - Level 1: Top 20% most common words (easiest)
    - Level 2: 20-40%
    - Level 3: 40-60%
    - Level 4: 60-80%
    - Level 5: 80-100% (hardest, least common)
    """
    percentile = rank / total_words
    if percentile <= 0.20:
        return 1
    elif percentile <= 0.40:
        return 2
    elif percentile <= 0.60:
        return 3
    elif percentile <= 0.80:
        return 4
    else:
        return 5


def convert_excel_to_json(input_file: str, output_file: str, language_code: str) -> dict:
    """Convert a single Excel file to JSON format."""
    print(f"Converting {input_file}...")

    # Read Excel file
    df = pd.read_excel(input_file, header=None)

    # The first row contains the first word and frequency (they used it as header)
    # We need to get the column names which contain the first entry
    first_word = df.columns[0]
    first_freq = df.columns[1]

    # Rename columns for clarity
    df.columns = ['word', 'frequency']

    # Add the first row back (it was used as header)
    first_row = pd.DataFrame({'word': [first_word], 'frequency': [first_freq]})
    df = pd.concat([first_row, df], ignore_index=True)

    # Clean data
    df['word'] = df['word'].astype(str).str.strip()
    df['frequency'] = pd.to_numeric(df['frequency'], errors='coerce').fillna(0).astype(int)

    # Remove empty words and numeric-only entries (like "0" from header)
    df = df[df['word'].str.len() > 0]
    df = df[df['word'] != 'nan']
    df = df[~df['word'].str.match(r'^\d+$')]  # Remove numeric-only words

    # Reset index after filtering
    df = df.reset_index(drop=True)

    total_words = len(df)

    # Convert to list of word objects
    words = []
    for idx, row in df.iterrows():
        rank = idx + 1  # 1-based rank
        word_obj = {
            "id": rank,
            "word": row['word'],
            "frequency": int(row['frequency']),
            "rank": rank,
            "difficulty": calculate_difficulty(rank, total_words)
        }
        words.append(word_obj)

    # Create final JSON structure
    result = {
        "language": language_code,
        "languageName": LANGUAGE_NAMES.get(language_code, language_code),
        "totalWords": total_words,
        "words": words
    }

    # Write to file
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"  -> Saved {total_words} words to {output_file}")

    return result


def main():
    """Convert all Excel files to JSON."""
    print("=" * 60)
    print("LingXM Excel to JSON Converter")
    print("=" * 60)

    # Convert each file
    stats = {}
    for excel_file, lang_code in FILE_MAPPING.items():
        input_path = os.path.join(INPUT_DIR, excel_file)
        output_path = os.path.join(OUTPUT_DIR, f"{lang_code}.json")

        if os.path.exists(input_path):
            result = convert_excel_to_json(input_path, output_path, lang_code)
            stats[lang_code] = result['totalWords']
        else:
            print(f"WARNING: {excel_file} not found, skipping...")

    # Print summary
    print("\n" + "=" * 60)
    print("Conversion Complete!")
    print("=" * 60)
    print("\nLanguages converted:")
    for lang, count in stats.items():
        print(f"  {LANGUAGE_NAMES.get(lang, lang):12} ({lang}): {count:,} words")

    print(f"\nOutput directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
