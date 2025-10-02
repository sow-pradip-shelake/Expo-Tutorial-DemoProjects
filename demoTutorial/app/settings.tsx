import { Text, View, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 18, color: '#007AFF' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
      </View>
      <View style={{ padding: 16 }}>
        <Text>Settings Screen</Text>
      </View>

       <Button title="Back all" onPress={() => {
              router.dismissAll();
            }} />
    </SafeAreaView>
  )
}

