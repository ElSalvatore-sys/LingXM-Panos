export class WordTooltip {
  constructor() {
    this.tooltip = document.getElementById('wordTooltip');
  }

  show(wordData, userLang, position) {
    // Populate tooltip
    document.getElementById('tooltipWord').textContent = wordData.word;
    document.getElementById('tooltipTranslation').textContent =
      wordData.translations[userLang];
    document.getElementById('tooltipMeta').textContent =
      `${wordData.category} • #${wordData.frequency_rank}`;
    document.getElementById('tooltipExplanation').textContent =
      wordData.explanation[userLang].substring(0, 100) + '...';

    // Position tooltip
    this.tooltip.style.display = 'block';
    this.tooltip.style.left = `${position.x}px`;
    this.tooltip.style.top = `${position.y + 20}px`;
  }

  hide() {
    this.tooltip.style.display = 'none';
  }
}
