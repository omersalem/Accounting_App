import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { signInWithEmailPassword } from '../../services/auth';
import { useAuthStore } from '../../hooks/useAuthStore';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { loading } = useAuthStore(); // shows app-level loading if needed

  const onSignIn = async () => {
    setErr(null);
    if (!email.trim() || !password) {
      setErr('Email and password are required.');
      return;
    }
    try {
      setBusy(true);
      await signInWithEmailPassword(email.trim(), password);
      // auth listener will route to App stack
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Sign-in failed';
      setErr(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center p-6">
        <Text className="mb-6 text-center text-3xl font-bold">Welcome</Text>

        {err ? <Text className="mb-3 text-center text-red-600">{err}</Text> : null}

        <View className="gap-4">
          <View>
            <Text className="mb-2 text-base">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              className="rounded-md border border-gray-300 px-4 py-3"
            />
          </View>

          <View>
            <Text className="mb-2 text-base">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              className="rounded-md border border-gray-300 px-4 py-3"
            />
          </View>

          <PrimaryButton
            title={busy || loading ? 'Signing in...' : 'Sign In'}
            onPress={onSignIn}
            disabled={busy || loading}
            testID="btn-sign-in"
            className="mt-2"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}