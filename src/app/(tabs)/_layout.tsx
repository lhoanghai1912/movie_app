import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Icon, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TABS: {
  name: string;
  title: string;
  icon: IoniconName;
  iconActive: IoniconName;
}[] = [
  { name: "index", title: "Home", icon: "home", iconActive: "home-outline" },
  {
    name: "search",
    title: "Khám phá",
    icon: "search",
    iconActive: "search-outline",
  },
  {
    name: "library",
    title: "Thư viện",
    icon: "bookmark",
    iconActive: "bookmark-outline",
  },
  {
    name: "profile",
    title: "Tôi",
    icon: "person",
    iconActive: "person-outline",
  },
];

export default function TabLayout() {
  const theme = useTheme();
  return (
    // <Tabs
    //   tabBar={(props) => <FloatingTabBar {...props} />}
    //   screenOptions={{ headerShown: false }}
    // >
    //   <Tabs.Screen name="index" options={{ title: "Home" }} />
    //   <Tabs.Screen name="search" options={{ title: "Khám phá" }} />
    //   <Tabs.Screen name="library" options={{ title: "Thư viện" }} />
    //   <Tabs.Screen name="profile" options={{ title: "Tôi" }} />
    // </Tabs>
    <NativeTabs
      backgroundColor={theme.surface}
      tintColor={theme.text}
      iconColor={{
        default: theme.text2,
        selected: theme.text,
      }}
      labelStyle={{
        default: { color: theme.text2, fontSize: 11 },
        selected: {
          color: theme.text,
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {TABS.map(({ name, title, icon, iconActive }) => (
        <NativeTabs.Trigger name={name} key={name} options={{ title }}>
          <Icon
            selectedColor={theme.bg}
            src={{
              default: <VectorIcon family={Ionicons} name={icon} />,
              selected: <VectorIcon family={Ionicons} name={iconActive} />,
            }}
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
