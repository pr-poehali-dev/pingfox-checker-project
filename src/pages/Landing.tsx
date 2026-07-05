import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Globe2', title: 'HTTP/HTTPS мониторинг', desc: 'Проверяем доступность сайта из нескольких точек' },
  { icon: 'Timer', title: 'Проверка от 1 минуты', desc: 'Узнаём о падении раньше клиентов' },
  { icon: 'History', title: 'История инцидентов', desc: 'Полный лог падений с точным временем и кодом ответа' },
  { icon: 'Send', title: 'Telegram и MAX', desc: 'Уведомления там, где вы уже общаетесь с командой' },
];

const competitors = [
  { name: 'Uptime Guard', pos: 'богатый функционал' },
  { name: 'Monitorus', pos: 'корпоративный мониторинг' },
  { name: 'UptimeTracker', pos: 'классический uptime' },
  { name: 'Uptimo', pos: 'базовый мониторинг' },
  { name: 'Host-Tracker', pos: 'международный сервис' },
];

const plans = [
  { name: 'Free', price: '0', period: '', features: ['1 сайт', 'Проверка раз в 5 мин', 'Email-уведомления', 'История 7 дней'], cta: 'Начать бесплатно', highlight: false },
  { name: 'Start', price: '199', period: '/мес', features: ['5 сайтов', 'Проверка раз в 1 мин', 'Telegram + Email', 'История 30 дней'], cta: 'Выбрать Start', highlight: false },
  { name: 'Pro', price: '399', period: '/мес', features: ['20 сайтов', 'Проверка раз в 1 мин', 'Telegram, MAX, Email', 'История 90 дней', 'SSL-мониторинг'], cta: 'Выбрать Pro', highlight: true },
  { name: 'Agency', price: '999', period: '/мес', features: ['Безлимит сайтов', 'Все каналы уведомлений', 'White-label отчёты', 'Приоритетная поддержка'], cta: 'Выбрать Agency', highlight: false },
];

const steps = [
  { n: '01', title: 'Добавьте сайт', desc: 'Введите домен — проверка стартует сразу' },
  { n: '02', title: 'Настройте уведомления', desc: 'Telegram, MAX, Email — выбирайте что удобно' },
  { n: '03', title: 'Спите спокойно', desc: 'Мы сообщим первыми, если что-то упадёт' },
];

const Landing = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-orange">
              <span className="text-lg">🦊</span>
            </div>
            <span className="font-bold tracking-tight">pingfox</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
            <a href="#how" className="hover:text-foreground transition-colors">Как это работает</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              Войти
            </Link>
            <Link
              to="/add"
              className="bg-primary text-primary-foreground font-medium text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative grid-lines">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative max-w-4xl mx-auto text-center px-6 pt-24 pb-20">
          <div className="rise inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            Сделано для рунета
          </div>
          <h1 className="rise text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]" style={{ animationDelay: '80ms' }}>
            Ваш сайт упал?<br />
            <span className="text-primary">Мы узнаем первыми.</span>
          </h1>
          <p className="rise text-lg text-muted-foreground mt-6 max-w-xl mx-auto" style={{ animationDelay: '160ms' }}>
            Мониторинг доступности сайтов с уведомлениями в Telegram и MAX.
            Цены в рублях, интерфейс на русском, запуск за 2 минуты.
          </p>
          <div className="rise flex flex-col sm:flex-row items-center justify-center gap-3 mt-9" style={{ animationDelay: '240ms' }}>
            <Link
              to="/add"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity glow-orange"
            >
              Подключить сайт бесплатно
              <Icon name="ArrowRight" size={18} />
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-border px-6 py-3.5 rounded-lg text-sm font-medium hover:border-primary/40 transition-colors"
            >
              Смотреть тарифы
            </a>
          </div>
          <p className="rise text-xs text-muted-foreground font-mono mt-5" style={{ animationDelay: '300ms' }}>
            без банковской карты · тариф Free навсегда
          </p>
        </div>

        {/* Dashboard preview mock */}
        <div className="relative max-w-4xl mx-auto px-6 pb-24">
          <div className="rise rounded-2xl border border-border bg-card p-4 sm:p-6 glow-orange" style={{ animationDelay: '360ms' }}>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { l: 'Доступность', v: '99.4%', c: 'text-success' },
                { l: 'Ср. отклик', v: '128ms', c: 'text-primary' },
                { l: 'Сайтов онлайн', v: '4 / 5', c: 'text-foreground' },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2">{s.l}</div>
                  <div className={`text-xl font-semibold font-mono ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { n: 'api.pingfox.ru', s: 'up' },
                { n: 'shop.example.ru', s: 'degraded' },
                { n: 'billing.acme.ru', s: 'down' },
              ].map((m) => (
                <div key={m.n} className="flex items-center gap-3 rounded-lg border border-border px-4 py-2.5">
                  <span className={`w-2 h-2 rounded-full ${m.s === 'up' ? 'bg-success' : m.s === 'degraded' ? 'bg-warning' : 'bg-destructive pulse-dot'}`} />
                  <span className="font-mono text-sm text-foreground/90">{m.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight">Всё для контроля доступности</h2>
          <p className="text-muted-foreground mt-3">Ничего лишнего — только то, что нужно владельцу сайта</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rise rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                <Icon name={f.icon} size={20} />
              </div>
              <h3 className="font-semibold tracking-tight mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 grid-lines relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card/95 to-transparent" />
          <div className="relative text-center max-w-lg mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Запуск за 2 минуты</h2>
            <p className="text-muted-foreground mt-3">Без сложных настроек и документации</p>
          </div>
          <div className="relative grid sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="rise text-center" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="font-mono text-4xl font-bold text-primary/30 mb-3">{s.n}</div>
                <h3 className="font-semibold tracking-tight mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Почему не {competitors[0].name}?</h2>
          <p className="text-muted-foreground mt-3">Мы сфокусированы на рунете: рубли, Telegram, MAX, русский интерфейс</p>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-4 bg-primary/10 border-b border-border">
            <span className="text-lg">🦊</span>
            <span className="font-semibold">pingfox</span>
            <span className="ml-auto text-sm text-primary font-mono">рунет, ₽, Telegram + MAX</span>
          </div>
          <div className="divide-y divide-border">
            {competitors.map((c) => (
              <div key={c.name} className="flex items-center gap-4 px-6 py-3.5 text-sm">
                <span className="text-foreground/80">{c.name}</span>
                <span className="ml-auto text-muted-foreground font-mono">{c.pos}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight">Простые тарифы в рублях</h2>
          <p className="text-muted-foreground mt-3">Начните бесплатно, платите только за рост</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`rise rounded-2xl border p-6 flex flex-col ${
                p.highlight ? 'border-primary glow-orange bg-primary/5 lg:-translate-y-3' : 'border-border bg-card'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {p.highlight && (
                <span className="self-start text-[10px] font-mono uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded-full mb-4">
                  популярный
                </span>
              )}
              <h3 className="font-semibold tracking-tight text-lg">{p.name}</h3>
              <div className="flex items-baseline gap-1 mt-3 mb-6">
                <span className="text-3xl font-bold font-mono">{p.price}</span>
                <span className="text-muted-foreground font-mono text-sm">₽{p.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Icon name="Check" size={15} className="text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/add"
                className={`text-center text-sm font-medium py-2.5 rounded-lg transition-opacity hover:opacity-90 ${
                  p.highlight ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary/40'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground font-mono mt-8">
          + доп. сайты, SMS, проверка раз в 30 сек и доп. регионы — гибкие аддоны в личном кабинете
        </p>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-primary/40 bg-primary/5 p-10 lg:p-14 text-center glow-orange relative overflow-hidden grid-lines">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/60" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight">Не ждите жалоб клиентов</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Подключите первый сайт бесплатно и узнавайте о падениях раньше всех
            </p>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity mt-8"
            >
              Подключить сайт бесплатно
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-sm">🦊</div>
            <span className="font-semibold text-sm">pingfox</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">© 2026 pingfox.ru · мониторинг для рунета</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
