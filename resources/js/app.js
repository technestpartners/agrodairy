import Alpine from 'alpinejs';

// Register Theme Store directly on Alpine instance before start
Alpine.store('theme', {
    current: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    init() {
        this.apply();
    },
    toggle() {
        this.current = this.current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.current);
        this.apply();
    },
    apply() {
        if (this.current === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
});

window.Alpine = Alpine;
Alpine.start();
