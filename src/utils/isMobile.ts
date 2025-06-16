
type Platform = 'android' | 'ios' | 'web'

export const getPlatform = (): Platform => {
    const userAgent: string = navigator.userAgent || navigator.vendor || ((window as Window & typeof globalThis & { opera?: string }).opera ?? '');

    if (/android/i.test(userAgent)) return 'android';
    if (/iPad|iPhone|iPod/.test(userAgent) && !((window as Window & typeof globalThis & { MSStream?: boolean }).MSStream ?? false)) return 'ios';

    return 'web';
};

export const isMobile = (): boolean => {
    const platform = getPlatform();
    return platform === 'android' || platform === 'ios';
};