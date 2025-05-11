import { Suspense } from "react";
import { Text, View } from "react-native";
import { api } from "~/trpc/react";

export function Hello() {
  const [hello] = api.post.hello.useSuspenseQuery({ text: "Murtaza" });

  return <Text className="text-red-500">{hello.greeting}</Text>;
}

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">
        Edit app/index.tsx to edit this screen. hello fanius
      </Text>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Hello />
      </Suspense>
    </View>
  );
}
