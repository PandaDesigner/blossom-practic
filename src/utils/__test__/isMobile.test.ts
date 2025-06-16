import { getPlatform, isMobile } from '../isMobile';

describe('getPlatform', () => {
    const mockUserAgent = (userAgent: string) => {
        Object.defineProperty(navigator, 'userAgent', {
            get: () => userAgent,
            configurable: true
        });
    };

    beforeEach(() => {
        // Reset userAgent before each test
        mockUserAgent('');
    });

    it('should return "android" for Android devices', () => {
        mockUserAgent('Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36');
        expect(getPlatform()).toBe('android');
    });

    it('should return "web" for non-mobile devices', () => {
        mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
        expect(getPlatform()).toBe('web');
    });
});

describe('isMobile', () => {
    it('should return true for mobile platforms', () => {
        const spyAndroid = jest.spyOn(navigator, 'userAgent', 'get');
        spyAndroid.mockReturnValue('Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36');
        expect(isMobile()).toBe(true);
        spyAndroid.mockRestore();
    });

    it('should return false for web platform', () => {
        jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
        expect(isMobile()).toBe(false);
    });
});
