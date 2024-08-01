/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { JSX, useRef, useState } from 'react';
import { Appearance } from 'react-native';
import {
    MD3LightTheme as lightTheme,
    MD3DarkTheme as darkTheme,
    PaperProvider,
} from 'react-native-paper';
import { Configuration, ConfigurationContext } from './ConfigurationContext'
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomAppBar } from './Components/CustomAppBar';
import storage from './Storage';
import { General } from './Pages/Settings/General';
import { DrawerContent } from './Components/DrawerContent';
import { Items } from './Pages/Items';
import { Presentation } from './Pages/Presentation';
import { Item, ItemsContext } from './ItemsContxt';
import 'react-native-get-random-values'

const Drawer = createDrawerNavigator();

export default function App(): JSX.Element {
    const fetchedThemeMode = useRef(false)

    let colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState((colorScheme ?? 'light') == 'dark' ? darkTheme : lightTheme)
    if (!fetchedThemeMode.current) {
        fetchedThemeMode.current = true
        storage.load({ key: 'themeMode' })
            .then((m) => {
                setTheme(m === 'light' ? lightTheme : darkTheme)
            })
    }

    const toggleTheme = async () => {
        setTheme(theme.dark ? lightTheme : darkTheme)
        await storage.save({ key: 'themeMode', expires: null, data: theme.dark ? 'light' : 'dark' })
    }

    const [configuration, setConfigurationState] = useState<Configuration | undefined>(undefined)

    if (!configuration)
        storage.load({ key: 'configuration' })
            .then((c) => { setConfigurationState(c) })

    const setConfiguration = async (c: Configuration) => {
        await storage.save({ key: 'configuration', expires: null, data: c })
        setConfiguration(c)
    }

    const [items, setItems] = useState<Item[]>([
        { name: 'مافیا' },
        { name: 'مافیا' },
        { name: 'شهر' },
        { name: 'شهر' },
        { name: 'شهر' },
        { name: 'شهر' },
    ]);

    const [shuffledItems, shuffleItems] = useState(shuffle(items))

    if (!configuration)
        return (<></>)

    return (
        <>
            <SafeAreaProvider>
                <ConfigurationContext.Provider value={{ ...configuration, setConfiguration, toggleTheme }}>
                    <PaperProvider theme={theme}>
                        <ItemsContext.Provider value={{ items, shuffledItems, setItems, shuffleItems: () => shuffleItems(shuffle(items)) }}>
                            <NavigationContainer theme={theme as unknown as Theme}>
                                <Drawer.Navigator
                                    initialRouteName="Presentation"
                                    drawerContent={(props) => <DrawerContent {...props} />}
                                    screenOptions={{
                                        header: (props) => <CustomAppBar {...props} />,
                                        drawerStyle: {
                                            backgroundColor: theme.colors.background,
                                        },
                                    }}
                                >
                                    <Drawer.Screen name="Items" component={Items} />
                                    <Drawer.Screen name="Presentation" component={Presentation} />
                                    <Drawer.Screen name="General" component={General} />
                                </Drawer.Navigator>
                            </NavigationContainer>
                        </ItemsContext.Provider>
                    </PaperProvider>
                </ConfigurationContext.Provider>
            </SafeAreaProvider>
        </>
    );
}

function shuffle(items: any[]): any[] {
    console.group('shuffle')

    const rand = crypto.getRandomValues(new Uint8Array(items.length)).map(e => e / 1000);
    console.log('crypto ', rand, rand.map(e => e % items.length))

    const newArray = [...items];
    let currentIndex = newArray.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
    }
    console.log({ newArray })

    console.groupEnd()
    return newArray
}

