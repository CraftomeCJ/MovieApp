import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Button } from 'react-native';
import { ApiState } from '../src/types/api-types';

const withApiState = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithApiState: React.FC<P & ApiState> = (props) => {
    const { loading, error, refresh, ...rest } = props;

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
          <Button title="Retry" onPress={refresh} />
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return <WrappedComponent {...(rest as P)} />;
  };

  return WithApiState;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default withApiState;