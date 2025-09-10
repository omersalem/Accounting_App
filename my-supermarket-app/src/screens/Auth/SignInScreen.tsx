import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { signInWithEmailPassword } from '../../services/auth';
import { useAuthStore } from '../../hooks/useAuthStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  errorText: {
    marginBottom: 12,
    textAlign: 'center',
    color: '#dc2626',
  },
  formContainer: {
    gap: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

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
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>

        {err ? <Text style={styles.errorText}>{err}</Text> : null}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={busy || loading ? 'Signing in...' : 'Sign In'}
              onPress={onSignIn}
              disabled={busy || loading}
              testID="btn-sign-in"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}