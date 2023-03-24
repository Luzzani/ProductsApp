import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  label: {
    color: '#FFFFFF',
    marginTop: 25,
    fontWeight: 'bold',
  },
  inputField: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  inputFieldIOS: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  containerButton: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
