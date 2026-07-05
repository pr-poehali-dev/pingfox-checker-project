import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const navItems = [
  { label: 'Дашборд', icon: 'LayoutGrid' },
  { label: 'Мониторинг', icon: 'Radar' },
  { label: 'История', icon: 'History' },
  { label: 'Алерты', icon: 'BellRing' },
  { label: 'Документация', icon: 'BookOpen' },
  { label: 'Профиль', icon: 'User' },
];

const monitors = [
  { name: 'api.pingfox.io', region: 'EU-West', status: 'up', uptime: '99.98%', latency: 84, checks: '8 640' },
  { name: 'app.mysite.com', region: 'US-East', status: 'up', uptime: '99.91%', latency: 142, checks: '8 640' },
  { name: 'shop.example.ru', region: 'EU-Central', status: 'degraded', uptime: '98.20%', latency: 512, checks: '8 640' },
  { name: 'blog.example.ru', region: 'Asia', status: 'up', uptime: '99.99%', latency: 96, checks: '8 640' },
  { name: 'billing.acme.dev', region: 'EU-West', status: 'down', uptime: '87.40%', latency: 0, checks: '8 640' },
];

const history = [
  { site: 'billing.acme.dev', event: 'Сайт недоступен', code: '503', time: '2 мин назад', kind: 'down' },
  { site: 'shop.example.ru', event: 'Медленный отклик', code: '512ms', time: '14 мин назад', kind: 'warn' },
  { site: 'api.pingfox.io', event: 'Проверка успешна', code: '200', time: '18 мин назад', kind: 'ok' },
  { site: 'app.mysite.com', event: 'Проверка успешна', code: '200', time: '23 мин назад', kind: 'ok' },
  { site: 'billing.acme.dev', event: 'SSL сертификат истекает', code: '7 дней', time: '1 ч назад', kind: 'warn' },
  { site: 'blog.example.ru', event: 'Проверка успешна', code: '200', time: '1 ч назад', kind: 'ok' },
];

const statusColor: Record<string, string> = {
  up: 'text-success',
  degraded: 'text-warning',
  down: 'text-destructive',
};
const statusBg: Record<string, string> = {
  up: 'bg-success',
  degraded: 'bg-warning',
  down: 'bg-destructive',
};
const statusLabel: Record<string, string> = {
  up: 'В сети',
  degraded: 'Замедлен',
  down: 'Упал',
};

const uptimeBars = Array.from({ length: 60 }, (_, i) => {
  const r = (i * 37) % 100;
  return r > 96 ? 'down' : r > 88 ? 'degraded' : 'up';
});

const responsePoints = [42, 55, 48, 60, 52, 70, 58, 45, 88, 62, 50, 65, 54, 72, 46, 58, 40, 50];

function Sparkline() {
  const w = 640;
  const h = 160;
  const max = Math.max(...responsePoints);
  const step = w / (responsePoints.length - 1);
  const pts = responsePoints.map((v, i) => `${i * step},${h - (v / max) * (h - 20) - 10}`);
  const line = pts.join(' ');
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(22 92% 55%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(22 92% 55%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#fill)" />
      <polyline
        points={line}
        fill="none"
        stroke="hsl(22 92% 55%)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="draw-line"
      />
    </svg>
  );
}

const Index = () => {
  const [active, setActive] = useState('Дашборд');

  return (
    <div className="min-h-screen flex text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card/40 backdrop-blur-sm p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-orange">
            <span className="text-lg">🦊</span>
          </div>
          <div>
            <div className="font-bold tracking-tight leading-none">pingfox</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">uptime monitor</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active === item.label
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            Все системы активны
          </div>
          <div className="font-mono text-xs text-foreground/70">next scan · 04:12</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between gap-4 px-6 lg:px-10 py-5 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              Дашборд
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              проверка каждые 5 минут · 5 сайтов
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border border-border bg-card">
              <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
              live
            </div>
            <Link to="/add" className="flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity glow-orange">
              <Icon name="Plus" size={16} />
              Добавить сайт
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8">
          {/* Metrics */}
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Доступность', value: '99.4', unit: '%', icon: 'Activity', tint: 'text-success' },
              { label: 'Ср. отклик', value: '128', unit: 'ms', icon: 'Gauge', tint: 'text-primary' },
              { label: 'Сайтов онлайн', value: '4 / 5', unit: '', icon: 'Globe', tint: 'text-foreground' },
              { label: 'Инцидентов', value: '1', unit: 'сейчас', icon: 'TriangleAlert', tint: 'text-destructive' },
            ].map((m, i) => (
              <div
                key={m.label}
                className="rise rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider">{m.label}</span>
                  <Icon name={m.icon} size={16} className={m.tint} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold font-mono tracking-tight">{m.value}</span>
                  <span className="text-sm text-muted-foreground font-mono">{m.unit}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Charts row */}
          <section className="grid lg:grid-cols-3 gap-4">
            {/* Response time chart */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 rise" style={{ animationDelay: '260ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold tracking-tight">Время отклика</h2>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">последние 90 минут · ms</p>
                </div>
                <div className="flex gap-1 text-xs font-mono">
                  {['1ч', '24ч', '7д'].map((t, i) => (
                    <button
                      key={t}
                      className={`px-2.5 py-1 rounded-md ${i === 0 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Sparkline />
            </div>

            {/* Uptime */}
            <div className="rounded-2xl border border-border bg-card p-6 rise" style={{ animationDelay: '330ms' }}>
              <h2 className="font-semibold tracking-tight">Доступность</h2>
              <p className="text-xs text-muted-foreground font-mono mt-0.5 mb-6">за 60 проверок</p>
              <div className="flex items-end gap-[3px] h-40">
                {uptimeBars.map((s, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${statusBg[s]} ${s === 'up' ? 'opacity-70' : ''}`}
                    style={{ height: s === 'down' ? '35%' : s === 'degraded' ? '65%' : '100%' }}
                    title={statusLabel[s]}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-success" />норма</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-warning" />медленно</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-destructive" />упал</span>
              </div>
            </div>
          </section>

          {/* Monitors + History */}
          <section className="grid lg:grid-cols-3 gap-4">
            {/* Monitors table */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden rise" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-semibold tracking-tight">Мониторинг сайтов</h2>
                <button className="text-xs font-mono text-primary hover:underline">управлять</button>
              </div>
              <div className="divide-y divide-border">
                {monitors.map((m) => (
                  <div key={m.name} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/40 transition-colors">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusBg[m.status]} ${m.status !== 'up' ? 'pulse-dot' : ''}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-sm truncate">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.region}</div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <div className="text-xs text-muted-foreground">uptime</div>
                      <div className="font-mono text-sm">{m.uptime}</div>
                    </div>
                    <div className="text-right w-20">
                      <div className="text-xs text-muted-foreground">отклик</div>
                      <div className="font-mono text-sm">{m.latency ? `${m.latency}ms` : '—'}</div>
                    </div>
                    <span className={`hidden md:inline text-xs font-medium ${statusColor[m.status]} w-16 text-right`}>
                      {statusLabel[m.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* History / Alerts feed */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden rise" style={{ animationDelay: '470ms' }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-semibold tracking-tight">История</h2>
                <Icon name="Bell" size={16} className="text-muted-foreground" />
              </div>
              <div className="divide-y divide-border">
                {history.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3.5">
                    <div className={`mt-1 w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      h.kind === 'down' ? 'bg-destructive/15 text-destructive' : h.kind === 'warn' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success'
                    }`}>
                      <Icon name={h.kind === 'down' ? 'X' : h.kind === 'warn' ? 'TriangleAlert' : 'Check'} size={13} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-tight">{h.event}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate">{h.site}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs">{h.code}</div>
                      <div className="text-[10px] text-muted-foreground">{h.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Alerts banner */}
          <section className="rounded-2xl border border-border bg-card p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 rise grid-lines relative overflow-hidden" style={{ animationDelay: '540ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
            <div className="relative flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Icon name="MailWarning" size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold tracking-tight">Email и SMS уведомления</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Мгновенное оповещение, если сайт упал или отвечает слишком медленно
                </p>
              </div>
            </div>
            <button className="relative bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shrink-0">
              Настроить алерты
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;