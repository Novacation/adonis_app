import { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    console.log('Register');
  }

  public async boot() {
    // IoC container is ready
    console.log('Boot');
  }

  public async ready() {
    // App is ready
    console.log('Ready');
  }

  public async shutdown() {
    // Cleanup, since app is going down
    console.log('Shutdown');
  }
}
