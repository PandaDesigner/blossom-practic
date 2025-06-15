import { getPlatform } from '../utils/isMobile';

const HomePage = () => {

    if (getPlatform() == 'web') {
        console.log('Web', getPlatform());
    } if (getPlatform() == 'android') {
        console.log('Android', getPlatform());
    } if (getPlatform() == 'ios') {
        console.log('IOS', getPlatform());
    }

    return (
        <div></div>
    );
};

export default HomePage;