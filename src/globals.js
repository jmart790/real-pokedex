/**
 * @description auto import components
 * // https://zerotomastery.io/blog/how-to-auto-register-components-for-vue-with-vite/
 */
export default {
  install(app) {
    const componentFiles = import.meta.globEager(
      './components/*/*.vue'
    );
    
    Object.entries(componentFiles).forEach(([path, m]) => {
      const componentName = path.split('/').pop().replace(/\.\w+$/, '');
      app.component(componentName, m.default);
    })

  }
};