import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ItemsContext } from "../ItemsContxt";

export function Presentation() {
    const itemsContext = useContext(ItemsContext)

    const [index, setIndex] = useState<number>(0)
    const [showContent, setShowContent] = useState<boolean>(false)

    if (!itemsContext?.shuffledItems || itemsContext?.shuffledItems?.length === 0)
        return (<Text>Items empty!</Text>)

    return (
        <>
            <ScrollView contentContainerStyle={{ width: '100%', padding: 30, justifyContent: 'center', flexDirection: 'column', flexGrow: 1 }}>
                <Button mode="outlined" onPress={() => {
                    if (itemsContext?.shuffleItems)
                        itemsContext?.shuffleItems()

                    setIndex(0)
                }} style={{ marginTop: 20 }} >
                    Reset & Shuffle
                </Button>
                <View onTouchEnd={() => !showContent ? setShowContent(true) : null} style={{ marginTop: 20 }}>
                    <Text>
                        {!showContent ? 'Show Content' : itemsContext?.shuffledItems[index]?.name}
                    </Text>
                </View>
                {index < (itemsContext?.shuffledItems?.length ?? -1) &&
                    <Button mode="outlined" onPress={() => { setShowContent(false); setIndex(index + 1) }} style={{ marginTop: 20 }} >
                        Next
                    </Button>
                }
            </ScrollView>
        </>
    )
}
