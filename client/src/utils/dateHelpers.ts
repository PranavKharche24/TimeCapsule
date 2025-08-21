// Date utility functions for consistent date handling across the app

export class DateHelpers {
  /**
   * Format a date for display in the UI
   */
  static formatDisplayDate(date: Date | string | null): string {
    if (!date) return 'No date set';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Format a date with time for detailed display
   */
  static formatDisplayDateTime(date: Date | string | null): string {
    if (!date) return 'No date set';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Get relative time string (e.g., "2 days ago", "in 3 hours")
   */
  static getRelativeTime(date: Date | string | null): string {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    const absDiff = Math.abs(diffMs);
    const isPast = diffMs < 0;

    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    let value: number;
    let unit: string;

    if (absDiff < minute) {
      return 'just now';
    } else if (absDiff < hour) {
      value = Math.floor(absDiff / minute);
      unit = 'minute';
    } else if (absDiff < day) {
      value = Math.floor(absDiff / hour);
      unit = 'hour';
    } else if (absDiff < week) {
      value = Math.floor(absDiff / day);
      unit = 'day';
    } else if (absDiff < month) {
      value = Math.floor(absDiff / week);
      unit = 'week';
    } else if (absDiff < year) {
      value = Math.floor(absDiff / month);
      unit = 'month';
    } else {
      value = Math.floor(absDiff / year);
      unit = 'year';
    }

    const plural = value !== 1 ? 's' : '';
    const timeString = `${value} ${unit}${plural}`;

    return isPast ? `${timeString} ago` : `in ${timeString}`;
  }

  /**
   * Calculate days until a future date
   */
  static getDaysUntil(date: Date | string | null): number {
    if (!date) return 0;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return 0;
    
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Get a human-readable countdown string
   */
  static getCountdownString(date: Date | string | null): string {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return 'Expired';
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      return 'Less than a minute';
    }
  }

  /**
   * Check if a date is today
   */
  static isToday(date: Date | string | null): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return dateObj.toDateString() === today.toDateString();
  }

  /**
   * Check if a date is tomorrow
   */
  static isTomorrow(date: Date | string | null): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return dateObj.toDateString() === tomorrow.toDateString();
  }

  /**
   * Check if a date is in the past
   */
  static isPast(date: Date | string | null): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.getTime() < new Date().getTime();
  }

  /**
   * Check if a date is in the future
   */
  static isFuture(date: Date | string | null): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.getTime() > new Date().getTime();
  }

  /**
   * Format date for input fields (YYYY-MM-DDTHH:mm)
   */
  static formatForInput(date: Date | string | null): string {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return '';
    
    // Format as YYYY-MM-DDTHH:mm for datetime-local input
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Parse input field date string to Date object
   */
  static parseFromInput(dateString: string): Date | null {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Get minimum date for delivery (e.g., at least 1 hour from now)
   */
  static getMinDeliveryDate(hoursFromNow: number = 1): string {
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + hoursFromNow);
    return this.formatForInput(minDate);
  }

  /**
   * Get maximum date for delivery (e.g., 50 years from now)
   */
  static getMaxDeliveryDate(yearsFromNow: number = 50): string {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + yearsFromNow);
    return this.formatForInput(maxDate);
  }

  /**
   * Validate if a delivery date is valid
   */
  static isValidDeliveryDate(date: Date | string | null): {
    isValid: boolean;
    error?: string;
  } {
    if (!date) {
      return { isValid: false, error: 'Date is required' };
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return { isValid: false, error: 'Invalid date format' };
    }

    const now = new Date();
    const minDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 50); // 50 years from now

    if (dateObj < minDate) {
      return { isValid: false, error: 'Delivery date must be at least 1 hour in the future' };
    }

    if (dateObj > maxDate) {
      return { isValid: false, error: 'Delivery date cannot be more than 50 years in the future' };
    }

    return { isValid: true };
  }

  /**
   * Format duration in seconds to human readable format
   */
  static formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      const remainingSeconds = Math.round(seconds % 60);
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  /**
   * Get time zone offset string (e.g., "UTC-5", "UTC+2")
   */
  static getTimeZoneOffset(): string {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset <= 0 ? '+' : '-';
    
    if (minutes === 0) {
      return `UTC${sign}${hours}`;
    }
    
    return `UTC${sign}${hours}:${String(minutes).padStart(2, '0')}`;
  }

  /**
   * Check if date is within business hours (9 AM - 5 PM)
   */
  static isBusinessHours(date: Date | string | null): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const hours = dateObj.getHours();
    const day = dateObj.getDay();
    
    // Monday = 1, Friday = 5
    return day >= 1 && day <= 5 && hours >= 9 && hours < 17;
  }

  /**
   * Add days to a date
   */
  static addDays(date: Date | string, days: number): Date {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  }

  /**
   * Add hours to a date
   */
  static addHours(date: Date | string, hours: number): Date {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setHours(dateObj.getHours() + hours);
    return dateObj;
  }

  /**
   * Get start of day
   */
  static startOfDay(date: Date | string): Date {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
  }

  /**
   * Get end of day
   */
  static endOfDay(date: Date | string): Date {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setHours(23, 59, 59, 999);
    return dateObj;
  }
}

export default DateHelpers;
