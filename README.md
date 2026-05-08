# Marco Valenti — Demo Sito Fotografo

Demo homepage editoriale (Next.js 14 + Tailwind) pensata per essere mostrata al cliente.

## Avvio rapido

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Deploy istantaneo (per mandare il link al cliente)

1. Push del progetto su GitHub
2. Importalo su https://vercel.com → deploy in 1 minuto
3. Mandi al cliente: `https://marcovalenti.vercel.app`

## Struttura

- `app/page.tsx` — Tutta la homepage, sezioni separate in componenti
- `app/layout.tsx` — Font (Cormorant Garamond + Inter) e metadata
- `app/globals.css` — Sistema di design (colori, container, hover)
- `tailwind.config.ts` — Palette ink/bone/ash, tipografia editoriale

## Personalizzazione veloce

- **Nome / payoff**: `app/page.tsx`, componente `Hero`
- **Foto portfolio**: array `PORTFOLIO` in cima a `page.tsx`
- **Contatti / Instagram**: componente `Contact` e `Footer`

Le immagini sono Unsplash (placeholder coerenti). Sostituirle con foto reali del cliente è il passo 1 della fase 2.
