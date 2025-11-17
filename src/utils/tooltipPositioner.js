/**
 * TooltipPositioner - Smart tooltip positioning logic
 * PARALLEL SAFE: Creates new file only
 */

export class TooltipPositioner {
  static position(tooltipElement, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    let top = rect.bottom + 10;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Below viewport? Show above
    if (top + tooltipRect.height > viewportHeight - 20) {
      top = rect.top - tooltipRect.height - 10;
    }

    // Off right edge? Align right
    if (left + tooltipRect.width > viewportWidth - 20) {
      left = viewportWidth - tooltipRect.width - 20;
    }

    // Off left edge? Align left
    if (left < 20) left = 20;

    return { top, left };
  }

  static show(tooltipElement, wordData, userLang, targetElement) {
    // Populate tooltip
    tooltipElement.querySelector('#tooltipWord').textContent = wordData.word;
    tooltipElement.querySelector('#tooltipTranslation').textContent =
      wordData.translations[userLang] || wordData.translations.en;
    tooltipElement.querySelector('#tooltipMeta').textContent =
      `${wordData.category} • #${wordData.frequency_rank}`;

    const explanation = (wordData.explanation[userLang] || wordData.explanation.en).substring(0, 100);
    tooltipElement.querySelector('#tooltipExplanation').textContent =
      explanation + (explanation.length >= 100 ? '...' : '');

    // Position
    const pos = this.position(tooltipElement, targetElement);
    tooltipElement.style.left = `${pos.left}px`;
    tooltipElement.style.top = `${pos.top}px`;
    tooltipElement.style.display = 'block';
  }

  static hide(tooltipElement) {
    tooltipElement.style.display = 'none';
  }
}
