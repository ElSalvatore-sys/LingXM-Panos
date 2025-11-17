/**
 * TooltipPositioner - Handles smart positioning for tooltips
 */
export class TooltipPositioner {
  constructor() {
    this.offset = {
      x: 0,
      y: 8
    };
    this.padding = 10; // Minimum distance from viewport edges
  }

  /**
   * Calculate optimal position for tooltip
   * @param {Object} targetRect - Bounding rect of target element
   * @param {Object} tooltipSize - Size of tooltip {width, height}
   * @returns {Object} Position {x, y, placement}
   */
  calculate(targetRect, tooltipSize) {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };

    let x = targetRect.left + viewport.scrollX + this.offset.x;
    let y = targetRect.bottom + viewport.scrollY + this.offset.y;
    let placement = 'bottom';

    // Check if tooltip fits below target
    const spaceBelow = viewport.height - (targetRect.bottom - viewport.scrollY);
    const spaceAbove = targetRect.top - viewport.scrollY;

    if (spaceBelow < tooltipSize.height + this.padding && spaceAbove > spaceBelow) {
      // Position above target
      y = targetRect.top + viewport.scrollY - tooltipSize.height - this.offset.y;
      placement = 'top';
    }

    // Check horizontal bounds
    if (x + tooltipSize.width > viewport.width - this.padding) {
      x = viewport.width - tooltipSize.width - this.padding + viewport.scrollX;
    }

    if (x < this.padding + viewport.scrollX) {
      x = this.padding + viewport.scrollX;
    }

    // Check vertical bounds for bottom placement
    if (placement === 'bottom' && y + tooltipSize.height > viewport.height + viewport.scrollY - this.padding) {
      y = viewport.height + viewport.scrollY - tooltipSize.height - this.padding;
    }

    // Check vertical bounds for top placement
    if (placement === 'top' && y < this.padding + viewport.scrollY) {
      y = this.padding + viewport.scrollY;
      placement = 'bottom'; // Fallback to bottom if can't fit above
    }

    return { x, y, placement };
  }

  /**
   * Position tooltip element
   * @param {HTMLElement} tooltip - Tooltip element
   * @param {Object} targetRect - Target element rect
   */
  position(tooltip, targetRect) {
    // Get tooltip size (it should be rendered but hidden)
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipSize = {
      width: tooltipRect.width,
      height: tooltipRect.height
    };

    const pos = this.calculate(targetRect, tooltipSize);

    tooltip.style.left = `${pos.x}px`;
    tooltip.style.top = `${pos.y}px`;
    tooltip.setAttribute('data-placement', pos.placement);

    return pos;
  }

  /**
   * Set offset
   */
  setOffset(x, y) {
    this.offset = { x, y };
  }

  /**
   * Set padding
   */
  setPadding(padding) {
    this.padding = padding;
  }
}
