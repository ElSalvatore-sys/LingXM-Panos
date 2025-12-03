#!/usr/bin/env python3
"""
Import sentence data from LingXM-Personal into LingXM-Panos format.

LingXM-Personal format:
{
  "metadata": {...},
  "sentences": {
    "word": [
      {
        "sentence": "...",
        "de": "...",
        "en": "...",
        "blank": "...",
        "difficulty": "basic|intermediate|advanced",
        "target_word": "..."
      }
    ]
  }
}

LingXM-Panos format:
{
  "meta": {
    "language": "de",
    "wordCount": 150,
    "sentenceCount": 350,
    "lastUpdated": "2025-12-03"
  },
  "examples": {
    "word": [
      { "sentence": "...", "translation": "..." }
    ]
  }
}
"""

import json
import os
import glob
from pathlib import Path
from datetime import date

# Paths
SOURCE_SENTENCES_DIR = "/Users/eldiaploo/Desktop/Projects-2025/LingXM-Personal/public/data/sentences"
SOURCE_UNIVERSAL_DIR = "/Users/eldiaploo/Desktop/Projects-2025/LingXM-Personal/public/data/universal"
TARGET_DIR = "/Users/eldiaploo/Desktop/LingXM-Panos/public/data/examples"

# Language names
LANG_NAMES = {
    'de': 'German',
    'en': 'English',
    'ar': 'Arabic',
    'ru': 'Russian',
    'it': 'Italian',
    'fr': 'French',
    'es': 'Spanish',
    'pl': 'Polish',
    'fa': 'Persian',
    'el': 'Greek',
    'tr': 'Turkish',
    'pt': 'Portuguese',
}

def convert_personal_to_panos(source_data, target_lang):
    """Convert LingXM-Personal sentence format to LingXM-Panos format."""

    result = {}
    sentences_data = source_data.get('sentences', source_data)

    for word, sentences in sentences_data.items():
        if not isinstance(sentences, list):
            continue

        converted_sentences = []
        for sent in sentences:
            if isinstance(sent, dict):
                # Get the sentence in target language
                sentence_text = (
                    sent.get('sentence') or
                    sent.get(target_lang) or
                    sent.get('de') or
                    sent.get('en') or
                    ''
                )

                # Get translation (prefer English for non-English, German for English)
                if target_lang == 'en':
                    translation = sent.get('de', '') or sent.get('translation', '')
                else:
                    translation = sent.get('en', '') or sent.get('translation', '')

                # Handle case where translation might be a dict
                if isinstance(translation, dict):
                    translation = translation.get('text', '') or ''
                if not isinstance(translation, str):
                    translation = str(translation) if translation else ''

                if sentence_text and isinstance(sentence_text, str) and sentence_text.strip():
                    converted = {
                        "sentence": sentence_text.strip(),
                        "translation": translation.strip() if translation else ""
                    }
                    converted_sentences.append(converted)

        if converted_sentences:
            # Normalize word key (lowercase for consistency)
            word_key = word.lower().strip()
            result[word_key] = converted_sentences

    return result

def merge_examples(existing, new_data):
    """Merge new examples with existing, avoiding duplicates."""

    merged = {}

    # Copy existing
    if existing:
        for word, sentences in existing.items():
            merged[word.lower().strip()] = list(sentences)

    # Add new, avoiding duplicates
    for word, sentences in new_data.items():
        word_key = word.lower().strip()

        if word_key in merged:
            existing_texts = {s.get('sentence', '').lower().strip() for s in merged[word_key]}
            for sent in sentences:
                sent_text = sent.get('sentence', '').lower().strip()
                if sent_text and sent_text not in existing_texts:
                    merged[word_key].append(sent)
                    existing_texts.add(sent_text)
        else:
            merged[word_key] = list(sentences)

    return merged

def process_sentence_files():
    """Process all sentence files from LingXM-Personal."""

    print("=" * 60)
    print("IMPORTING SENTENCES FROM LingXM-Personal")
    print("=" * 60)

    lang_data = {}

    # Process main sentence directories
    for lang_dir in os.listdir(SOURCE_SENTENCES_DIR):
        dir_path = os.path.join(SOURCE_SENTENCES_DIR, lang_dir)

        if os.path.isdir(dir_path):
            # Process files in subdirectory (e.g., sentences/de/, sentences/en/)
            for filename in os.listdir(dir_path):
                if filename.endswith('.json') and 'OLD' not in filename:
                    filepath = os.path.join(dir_path, filename)
                    process_single_file(filepath, lang_data)
        elif lang_dir.endswith('.json') and 'OLD' not in lang_dir:
            # Process file directly in sentences folder
            filepath = os.path.join(SOURCE_SENTENCES_DIR, lang_dir)
            process_single_file(filepath, lang_data)

    return lang_data

def process_single_file(filepath, lang_data):
    """Process a single sentence file."""

    filename = os.path.basename(filepath)

    # Parse language from filename (e.g., "de-b1b2-sentences.json" -> "de")
    parts = filename.replace('.json', '').split('-')
    lang_code = parts[0]

    # Handle specialized folders like "de-specialized"
    if lang_code not in LANG_NAMES:
        # Try parent folder name
        parent = os.path.basename(os.path.dirname(filepath))
        if parent.startswith('de'):
            lang_code = 'de'
        else:
            print(f"  Skipping unknown language: {filename}")
            return

    print(f"\nProcessing: {filename}")

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        converted = convert_personal_to_panos(data, lang_code)
        word_count = len(converted)
        sentence_count = sum(len(s) for s in converted.values())

        print(f"  Converted: {word_count} words, {sentence_count} sentences")

        # Merge with existing data for this language
        if lang_code not in lang_data:
            lang_data[lang_code] = {}

        lang_data[lang_code] = merge_examples(lang_data[lang_code], converted)

    except Exception as e:
        print(f"  ERROR: {e}")

def process_universal_vocab():
    """Process universal vocabulary files with multilingual examples."""

    print("\n" + "=" * 60)
    print("IMPORTING UNIVERSAL VOCABULARY")
    print("=" * 60)

    if not os.path.exists(SOURCE_UNIVERSAL_DIR):
        print("  Universal directory not found, skipping...")
        return {}

    universal_files = glob.glob(f"{SOURCE_UNIVERSAL_DIR}/*.json")

    lang_data = {}
    processed_count = 0

    for filepath in sorted(universal_files):
        filename = os.path.basename(filepath)

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)

            if not isinstance(data, list):
                continue

            for item in data:
                word = item.get('word', '')
                examples = item.get('examples', {})
                translations = item.get('translations', {})

                # Process examples for each language
                for lang_code, lang_examples in examples.items():
                    if lang_code not in LANG_NAMES or not isinstance(lang_examples, list):
                        continue

                    if lang_code not in lang_data:
                        lang_data[lang_code] = {}

                    # Get the word in the target language
                    word_in_lang = translations.get(lang_code, word)
                    word_key = word_in_lang.lower().strip()

                    if not word_key:
                        continue

                    if word_key not in lang_data[lang_code]:
                        lang_data[lang_code][word_key] = []

                    # Get English examples for translation
                    en_examples = examples.get('en', [])

                    for i, example in enumerate(lang_examples):
                        if not example or not example.strip():
                            continue

                        # Get English translation if available
                        translation = ''
                        if lang_code != 'en' and i < len(en_examples):
                            translation = en_examples[i]

                        lang_data[lang_code][word_key].append({
                            "sentence": example.strip(),
                            "translation": translation.strip() if translation else ""
                        })

            processed_count += 1

        except Exception as e:
            print(f"  ERROR in {filename}: {e}")

    print(f"  Processed {processed_count} universal vocabulary files")

    return lang_data

def load_existing_data(filepath):
    """Load existing example data from a file."""

    if not os.path.exists(filepath):
        return {}

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Handle both formats: with 'examples' key or direct dict
        if isinstance(data, dict):
            examples = data.get('examples', data)
            # Make sure we return a dict, not a list or other type
            if isinstance(examples, dict):
                return examples
            return {}
        return {}
    except:
        return {}

def save_merged_data(lang_data):
    """Save merged data to LingXM-Panos format."""

    print("\n" + "=" * 60)
    print("SAVING MERGED DATA")
    print("=" * 60)

    os.makedirs(TARGET_DIR, exist_ok=True)

    results = {}

    for lang_code, examples in lang_data.items():
        output_path = f"{TARGET_DIR}/{lang_code}.json"

        # Load existing data
        existing = load_existing_data(output_path)

        # Merge
        merged = merge_examples(existing, examples)

        # Sort by word
        sorted_merged = dict(sorted(merged.items()))

        # Calculate counts
        word_count = len(sorted_merged)
        sentence_count = sum(len(s) for s in sorted_merged.values())

        # Create output with meta
        output = {
            "meta": {
                "language": lang_code,
                "languageName": LANG_NAMES.get(lang_code, lang_code.upper()),
                "wordCount": word_count,
                "sentenceCount": sentence_count,
                "lastUpdated": date.today().isoformat(),
                "source": "LingXM-Personal import"
            },
            "examples": sorted_merged
        }

        # Save
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        results[lang_code] = {
            'words': word_count,
            'sentences': sentence_count
        }

        print(f"  {lang_code}.json: {word_count} words, {sentence_count} sentences")

    return results

def main():
    print("\n" + "=" * 60)
    print("LingXM-Personal to LingXM-Panos Sentence Import")
    print("=" * 60)
    print(f"Source: {SOURCE_SENTENCES_DIR}")
    print(f"Target: {TARGET_DIR}")
    print("=" * 60)

    # Process sentence files
    sentence_data = process_sentence_files()

    # Process universal vocabulary
    universal_data = process_universal_vocab()

    # Merge all data
    all_data = {}

    for lang, data in sentence_data.items():
        all_data[lang] = data

    for lang, data in universal_data.items():
        if lang in all_data:
            all_data[lang] = merge_examples(all_data[lang], data)
        else:
            all_data[lang] = data

    # Save
    results = save_merged_data(all_data)

    print("\n" + "=" * 60)
    print("IMPORT COMPLETE!")
    print("=" * 60)

    # Summary
    total_words = sum(r['words'] for r in results.values())
    total_sentences = sum(r['sentences'] for r in results.values())

    print(f"\nTotal: {total_words} words, {total_sentences} sentences")
    print(f"Languages: {', '.join(sorted(results.keys()))}")

    print("\n" + "=" * 60)
    print("PER-LANGUAGE SUMMARY")
    print("=" * 60)

    for lang in sorted(results.keys()):
        r = results[lang]
        print(f"  {lang}: {r['words']} words, {r['sentences']} sentences")

if __name__ == "__main__":
    main()
