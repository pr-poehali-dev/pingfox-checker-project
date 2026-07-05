import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const intervals = [
  { label: '1 мин', value: '60', hint: 'Pro' },
  { label: '5 мин', value: '300', hint: 'по умолчанию' },
  { label: '15 мин', value: '900', hint: '' },
  { label: '30 мин', value: '1800', hint: '' },
];

const methods = ['GET', 'HEAD', 'POST'];

const regions = [
  { id: 'eu-west', label: 'EU-West', city: 'Амстердам' },
  { id: 'eu-central', label: 'EU-Central', city: 'Франкфурт' },
  { id: 'us-east', label: 'US-East', city: 'Нью-Йорк' },
  { id: 'asia', label: 'Asia', city: 'Сингапур' },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-primary' : 'bg-secondary border border-border'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform ${on ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        {hint && <span className="text-xs font-mono text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const AddSite = () => {
  const [interval, setInterval] = useState('300');
  const [method, setMethod] = useState('GET');
  const [ssl, setSsl] = useState(true);
  const [follow, setFollow] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['eu-west', 'us-east']);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [telegram, setTelegram] = useState(false);

  const toggleRegion = (id: string) =>
    setSelectedRegions((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  return (
    <div className="min-h-screen text-foreground">
      {/* Topbar */}
      <header className="flex items-center justify-between gap-4 px-6 lg:px-10 py-5 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <Icon name="ArrowLeft" size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Новый мониторинг</h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">добавьте сайт для проверки</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 opacity-80">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-lg">🦊</span>
          </div>
          <span className="font-bold tracking-tight hidden sm:inline">pingfox</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 lg:p-10 grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form className="lg:col-span-2 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Основное */}
          <section className="rounded-2xl border border-border bg-card p-6 space-y-5 rise">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="Globe" size={18} />
              <h2 className="font-semibold tracking-tight text-foreground">Основное</h2>
            </div>

            <Field label="Название">
              <input
                type="text"
                placeholder="Мой сайт"
                className="w-full bg-secondary/50 border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
              />
            </Field>

            <Field label="URL сайта" hint="https://">
              <div className="flex items-center bg-secondary/50 border border-border rounded-lg focus-within:border-primary/60 transition-colors overflow-hidden">
                <span className="pl-3.5 pr-2 text-muted-foreground font-mono text-sm">https://</span>
                <input
                  type="text"
                  placeholder="example.com"
                  className="flex-1 bg-transparent py-2.5 pr-3.5 text-sm font-mono outline-none placeholder:text-muted-foreground"
                />
              </div>
            </Field>

            <Field label="HTTP-метод">
              <div className="flex gap-2">
                {methods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-mono border transition-colors ${
                      method === m
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Field>
          </section>

          {/* Интервал и регионы */}
          <section className="rounded-2xl border border-border bg-card p-6 space-y-5 rise" style={{ animationDelay: '80ms' }}>
            <div className="flex items-center gap-2 text-primary">
              <Icon name="Timer" size={18} />
              <h2 className="font-semibold tracking-tight text-foreground">Проверка</h2>
            </div>

            <Field label="Интервал проверки">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {intervals.map((it) => (
                  <button
                    key={it.value}
                    type="button"
                    onClick={() => setInterval(it.value)}
                    className={`rounded-lg border py-3 px-2 text-center transition-colors ${
                      interval === it.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/50 hover:border-primary/40'
                    }`}
                  >
                    <div className={`text-sm font-mono font-medium ${interval === it.value ? 'text-primary' : 'text-foreground'}`}>
                      {it.label}
                    </div>
                    {it.hint && <div className="text-[10px] text-muted-foreground mt-0.5">{it.hint}</div>}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Регионы проверки" hint={`${selectedRegions.length} выбрано`}>
              <div className="grid grid-cols-2 gap-2">
                {regions.map((r) => {
                  const on = selectedRegions.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => toggleRegion(r.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        on ? 'border-primary/60 bg-primary/10' : 'border-border bg-secondary/50 hover:border-primary/40'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          on ? 'bg-primary border-primary' : 'border-border'
                        }`}
                      >
                        {on && <Icon name="Check" size={13} className="text-primary-foreground" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-mono truncate">{r.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{r.city}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="space-y-3 pt-1">
              <label className="flex items-center justify-between cursor-pointer" onClick={() => setSsl(!ssl)}>
                <div>
                  <div className="text-sm font-medium">Проверять SSL-сертификат</div>
                  <div className="text-xs text-muted-foreground">Предупредить за 7 дней до истечения</div>
                </div>
                <Toggle on={ssl} onClick={() => setSsl(!ssl)} />
              </label>
              <label className="flex items-center justify-between cursor-pointer" onClick={() => setFollow(!follow)}>
                <div>
                  <div className="text-sm font-medium">Следовать за редиректами</div>
                  <div className="text-xs text-muted-foreground">Обрабатывать коды 301 / 302</div>
                </div>
                <Toggle on={follow} onClick={() => setFollow(!follow)} />
              </label>
            </div>
          </section>

          {/* Уведомления */}
          <section className="rounded-2xl border border-border bg-card p-6 space-y-4 rise" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center gap-2 text-primary">
              <Icon name="BellRing" size={18} />
              <h2 className="font-semibold tracking-tight text-foreground">Уведомления при падении</h2>
            </div>

            {[
              { on: email, set: setEmail, icon: 'Mail', label: 'Email', hint: 'you@example.com' },
              { on: sms, set: setSms, icon: 'MessageSquare', label: 'SMS', hint: '+7 900 000-00-00' },
              { on: telegram, set: setTelegram, icon: 'Send', label: 'Telegram', hint: 'подключить бота' },
            ].map((c) => (
              <div
                key={c.label}
                className={`flex items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                  c.on ? 'border-primary/40 bg-primary/5' : 'border-border bg-secondary/50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.on ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  <Icon name={c.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{c.label}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">{c.hint}</div>
                </div>
                <Toggle on={c.on} onClick={() => c.set(!c.on)} />
              </div>
            ))}
          </section>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity glow-orange"
            >
              <Icon name="Plus" size={16} />
              Создать мониторинг
            </button>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground px-4 py-3 transition-colors"
            >
              Отмена
            </Link>
          </div>
        </form>

        {/* Preview aside */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 rise" style={{ animationDelay: '120ms' }}>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Предпросмотр
            </div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-success pulse-dot" />
              <span className="font-mono text-sm">example.com</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { k: 'Интервал', v: intervals.find((i) => i.value === interval)?.label },
                { k: 'Метод', v: method },
                { k: 'Регионы', v: `${selectedRegions.length} шт.` },
                { k: 'SSL', v: ssl ? 'вкл' : 'выкл' },
                { k: 'Каналы', v: [email && 'Email', sms && 'SMS', telegram && 'TG'].filter(Boolean).join(', ') || '—' },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{row.k}</span>
                  <span className="font-mono text-foreground/90">{row.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border flex items-start gap-2.5 text-xs text-muted-foreground">
              <Icon name="Info" size={14} className="mt-0.5 shrink-0 text-primary" />
              Первая проверка начнётся сразу после создания.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddSite;