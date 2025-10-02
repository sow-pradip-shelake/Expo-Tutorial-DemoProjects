import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet } from "react-native";





export default function DetailsScreen() {
  
    const {id} = useLocalSearchParams();
    return (
    <ThemedView style={styles.container}>
      <ThemedText>This is the details for item with id: {id}</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>

      <Button title="Settings" onPress={() => {
        router.navigate('/settings');
      }} />
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});