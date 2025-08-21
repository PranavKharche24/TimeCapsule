// Animation configuration and utilities for consistent animations across the app

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

export const ANIMATION_CONFIGS = {
  CASCADE: {
    duration: 0.6,
    delay: 0.1,
    easing: 'ease-out',
  },
  HOVER: {
    duration: 0.3,
    delay: 0,
    easing: 'ease-in-out',
  },
  MODAL: {
    duration: 0.4,
    delay: 0,
    easing: 'ease-out',
  },
  LOADING: {
    duration: 1.5,
    delay: 0,
    easing: 'ease-in-out',
  },
} as const;

// Animation utility functions
export class AnimationUtils {
  static createCascadeDelay(index: number, baseDelay: number = 0.1): string {
    return `${baseDelay * (index + 1)}s`;
  }

  static observeElementsForAnimation(
    selector: string,
    animationClass: string = 'animate-cascade-in'
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });

    return observer;
  }

  static addHoverEffect(
    element: HTMLElement,
    config: Partial<AnimationConfig> = {}
  ): void {
    const { duration, easing } = { ...ANIMATION_CONFIGS.HOVER, ...config };
    
    element.style.transition = `all ${duration}s ${easing}`;
    
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-8px) scale(1.02)';
      element.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0) scale(1)';
      element.style.boxShadow = 'none';
    });
  }

  static pulseGlow(element: HTMLElement, color: string = 'rgba(255, 107, 53, 0.3)'): void {
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.setProperty('--glow-color', color);
      element.classList.add('animate-pulse-glow');
    }, 10);
  }

  static morphNavigation(element: HTMLElement): void {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'morphNav 0.3s ease-in-out forwards';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.animation = 'morphNav 0.3s ease-in-out reverse';
    });
  }

  static temporalParticle(
    container: HTMLElement,
    particleCount: number = 7
  ): void {
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'temporal-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 4}s`;
      container.appendChild(particle);
    }
  }

  static timelineFlow(element: HTMLElement): void {
    const flowElement = document.createElement('div');
    flowElement.className = 'absolute inset-0 opacity-50';
    flowElement.innerHTML = `
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-timeline-green/30 to-transparent animate-timeline-flow"></div>
    `;
    element.appendChild(flowElement);
  }

  static cascadeChildren(
    container: HTMLElement,
    baseDelay: number = 0.1
  ): void {
    const children = Array.from(container.children) as HTMLElement[];
    
    children.forEach((child, index) => {
      child.style.animationDelay = this.createCascadeDelay(index, baseDelay);
      child.classList.add('animate-cascade-in');
    });
  }

  static smoothTransition(
    element: HTMLElement,
    properties: string[],
    duration: number = 0.3
  ): void {
    element.style.transition = properties
      .map(prop => `${prop} ${duration}s ease-in-out`)
      .join(', ');
  }

  static createLoadingSpinner(color: string = 'var(--tva-orange)'): HTMLElement {
    const spinner = document.createElement('div');
    spinner.className = 'tva-spinner';
    spinner.style.setProperty('--spinner-color', color);
    return spinner;
  }

  static fadeInUp(
    element: HTMLElement,
    delay: number = 0,
    duration: number = 0.6
  ): void {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);
  }

  static slideIn(
    element: HTMLElement,
    direction: 'left' | 'right' | 'up' | 'down' = 'left',
    delay: number = 0,
    duration: number = 0.4
  ): void {
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)',
    };

    element.style.transform = transforms[direction];
    element.style.transition = `transform ${duration}s ease-out ${delay}s`;
    
    setTimeout(() => {
      element.style.transform = 'translateX(0) translateY(0)';
    }, 50);
  }

  static scaleIn(
    element: HTMLElement,
    delay: number = 0,
    duration: number = 0.3
  ): void {
    element.style.transform = 'scale(0.9)';
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`;
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    }, 50);
  }

  static setupScrollAnimations(): void {
    // Setup intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Add cascade animation if not already present
            if (!element.classList.contains('animate-cascade-in')) {
              element.classList.add('animate-cascade-in');
            }
            
            // Trigger any custom animations based on data attributes
            const animationType = element.getAttribute('data-animation');
            if (animationType) {
              element.classList.add(`animate-${animationType}`);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe elements with animation classes or data attributes
    document.querySelectorAll('[class*="cascade-delay"], [data-animation]').forEach((el) => {
      observer.observe(el);
    });
  }

  static cleanup(): void {
    // Clean up any running animations or observers
    document.querySelectorAll('.animate-cascade-in').forEach((el) => {
      el.classList.remove('animate-cascade-in');
    });
    
    // Remove temporary particles
    document.querySelectorAll('.temporal-particle').forEach((el) => {
      el.remove();
    });
  }
}

// Initialize scroll animations when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    AnimationUtils.setupScrollAnimations();
  });
}

// Export for use in components
export default AnimationUtils;
