import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import { View, Text } from '@tamagui/core';
import { Card } from 'styles/ui';

export interface IDialogButton {
  text: string;
  variant?: 'primary' | 'cancel' | 'destructive';
}

interface IDialogConfig {
  title?: string;
  message: string;
  buttons: Array<IDialogButton>;
}

interface IDialogContext {
  // 눌린 버튼의 인덱스를 돌려줍니다.
  open: (config: IDialogConfig) => Promise<number>;
  alert: (message: string, title?: string) => Promise<void>;
  confirm: (options: {
    message: string;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    destructive?: boolean;
  }) => Promise<boolean>;
}

const DialogContext = createContext<IDialogContext>({
  open: async () => 0,
  alert: async () => {},
  confirm: async () => false,
});

export const useDialog = () => useContext(DialogContext);

/**
 * 네이티브 Alert.alert 대신 쓰는 앱 톤의 다이얼로그.
 * 라이트/다크 테마를 따르고, 잉크 버튼/고스트 버튼으로 액션을 보여줍니다.
 */
export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<IDialogConfig | null>(null);
  const resolver = useRef<(index: number) => void>(() => {});

  const open = useCallback((next: IDialogConfig) => {
    setConfig(next);
    return new Promise<number>(resolve => {
      resolver.current = resolve;
    });
  }, []);

  const alert = useCallback(
    async (message: string, title?: string) => {
      await open({ title, message, buttons: [{ text: 'OK', variant: 'primary' }] });
    },
    [open],
  );

  const confirm = useCallback(
    async ({
      message,
      title,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      destructive = false,
    }: {
      message: string;
      title?: string;
      confirmText?: string;
      cancelText?: string;
      destructive?: boolean;
    }) => {
      const index = await open({
        title,
        message,
        buttons: [
          { text: cancelText, variant: 'cancel' },
          { text: confirmText, variant: destructive ? 'destructive' : 'primary' },
        ],
      });
      return index === 1;
    },
    [open],
  );

  const onPress = (index: number) => {
    setConfig(null);
    resolver.current(index);
  };

  return (
    <DialogContext.Provider value={{ open, alert, confirm }}>
      {children}
      <Modal
        visible={config !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => onPress(0)}
      >
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          paddingHorizontal={36}
          backgroundColor="rgba(0,0,0,0.45)"
        >
          {config && (
            <Card width="100%" maxWidth={340} padding={24}>
              {config.title ? (
                <Text
                  color="$color"
                  fontSize={18}
                  fontWeight="600"
                  letterSpacing={-0.3}
                  marginBottom={8}
                >
                  {config.title}
                </Text>
              ) : null}
              <Text color="$colorSubtle" fontSize={15} lineHeight={22}>
                {config.message}
              </Text>

              <View flexDirection="row" justifyContent="flex-end" gap={10} marginTop={22}>
                {config.buttons.map((button, index) => {
                  const isPrimary = button.variant === 'primary';
                  const isDestructive = button.variant === 'destructive';
                  return (
                    <Pressable
                      key={button.text}
                      onPress={() => onPress(index)}
                      hitSlop={6}
                    >
                      <View
                        paddingHorizontal={18}
                        height={42}
                        borderRadius={21}
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={
                          isPrimary
                            ? '$ink'
                            : isDestructive
                            ? '#EB5545'
                            : 'transparent'
                        }
                      >
                        <Text
                          fontSize={15}
                          fontWeight="500"
                          color={
                            isPrimary
                              ? '$onInk'
                              : isDestructive
                              ? '#FFFFFF'
                              : '$colorSubtle'
                          }
                        >
                          {button.text}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </Card>
          )}
        </View>
      </Modal>
    </DialogContext.Provider>
  );
}
