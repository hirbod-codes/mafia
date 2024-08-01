import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { ItemsContext } from "../ItemsContxt";

export function Items() {
    const itemsContext = useContext(ItemsContext)

    return (
        <>
            <ScrollView contentContainerStyle={{ width: '100%', padding: 30, justifyContent: 'space-between', flexDirection: 'column', flexGrow: 1 }}>
                {(itemsContext?.items ?? []).map((item, i) =>
                    <View key={i} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput mode='outlined' label='content' style={{ flexGrow: 2 }} value={item.name} onChangeText={(t) => {
                            if (!itemsContext?.setItems)
                                return
                            const arr = itemsContext?.items ?? []
                            arr[i].name = t
                            itemsContext.setItems([...arr])
                        }} />
                        <IconButton onPress={() => {
                            if (!itemsContext?.setItems)
                                return
                            const arr = (itemsContext?.items ?? []).filter((v, fi) => fi !== i)
                            itemsContext.setItems([...arr])
                        }} size={20} icon='delete' iconColor={'red'} />
                    </View>
                )}

                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <IconButton onPress={() => {
                        if (!itemsContext?.setItems)
                            return
                        const arr = itemsContext?.items ?? []
                        arr.pop()
                        itemsContext.setItems([...arr])
                    }} size={20} icon='close' iconColor={'red'} />
                    <IconButton onPress={() => {
                        if (!itemsContext?.setItems)
                            return
                        const arr = itemsContext?.items ?? []
                        arr.push({ name: '' })
                        itemsContext.setItems([...arr])
                    }} size={20} icon='plus' iconColor={'green'} />
                </View>
            </ScrollView>
        </>
    )
}
