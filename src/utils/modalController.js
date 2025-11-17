/**
 * ModalController - Enhanced modal control with auto-dismiss
 */
export class ModalController {
  constructor(modalId = 'wordModal', contentId = 'modalContent') {
    this.modal = document.getElementById(modalId);
    this.content = document.getElementById(contentId);
    this.isOpen = false;
    this.autoDismissTimeout = null;

    this._setupListeners();
  }

  /**
   * Setup event listeners
   * @private
   */
  _setupListeners() {
    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Mouse leave auto-dismiss
    this.content.addEventListener('mouseleave', () => {
      this._startAutoDismiss();
    });

    this.content.addEventListener('mouseenter', () => {
      this._cancelAutoDismiss();
    });

    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Open modal
   */
  open() {
    this.modal.style.display = 'flex';
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    this._cancelAutoDismiss();
  }

  /**
   * Close modal
   */
  close() {
    this.modal.style.display = 'none';
    this.isOpen = false;
    document.body.style.overflow = '';
    this._cancelAutoDismiss();
  }

  /**
   * Toggle modal
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Start auto-dismiss timer
   * @private
   */
  _startAutoDismiss(delay = 1500) {
    this._cancelAutoDismiss();
    this.autoDismissTimeout = setTimeout(() => {
      this.close();
    }, delay);
  }

  /**
   * Cancel auto-dismiss timer
   * @private
   */
  _cancelAutoDismiss() {
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
      this.autoDismissTimeout = null;
    }
  }

  /**
   * Set auto-dismiss on/off
   */
  setAutoDismiss(enabled) {
    this.autoDismissEnabled = enabled;
  }
}
