import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, IconButton, Menu } from 'react-native-paper';

import { appStyles } from '../appStyles';
import { languageItems } from '../language-items';
import { RootStackParamList } from '../navigator/types';
import { LanguageContext } from '../providers/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppBar = ({
  showBackButton = false,
  title,
  showLanguagePicker,
  showMenuButton,
}: {
  showBackButton?: boolean;
  showLanguagePicker?: boolean;
  showMenuButton?: boolean;
  title: string;
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { language } = useContext(LanguageContext);
  const isArabic = language === 'arabic';

  const activeLanguageItem = languageItems.find(
    (item) => item.value === language,
  );
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Appbar.Header
        style={{
          ...styles.appBar,
          flexDirection: isArabic ? 'row-reverse' : 'row',
        }}
        elevated
      >
        {showBackButton && (
          <IconButton
            icon={isArabic ? 'arrow-right' : 'arrow-left'}
            iconColor="white"
            onPress={() => navigation.goBack()}
          />
        )}
        <Appbar.Content
          titleStyle={{
            ...styles.title,
            marginLeft: !showBackButton && !isArabic ? 16 : 0,
          }}
          style={{
            display: 'flex',
            flexDirection: isArabic ? 'row-reverse' : 'row',
          }}
          title={title}
        />
        <View
          style={{
            ...styles.menuIcons,
            flexDirection: isArabic ? 'row-reverse' : 'row',
          }}
        >
          {showLanguagePicker && activeLanguageItem && (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChooseLanguage')}
            >
              <View
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {activeLanguageItem.icon}
              </View>
            </TouchableOpacity>
          )}
          {showMenuButton && (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchorPosition="bottom"
              contentStyle={{ backgroundColor: 'white' }}
              anchor={
                <Appbar.Action
                  iconColor="white"
                  icon="dots-vertical"
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate('About');
                  closeMenu();
                }}
                title="About"
              />
            </Menu>
          )}
        </View>
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: appStyles.primary,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  menuIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});
export default AppBar;
