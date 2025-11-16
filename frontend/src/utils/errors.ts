type DjangoError = string | string[] | Record<string, string[]>;

export function extractMessages(err: DjangoError): string[] {
  if (typeof err === "string") return [err];

  if (Array.isArray(err)) return err;

  return Object.values(err).flat();
}


export function translateError(msg: string): string {
  const map: Record<string, string> = {
    "too short": "A senha é muito curta. Deve ter no mínimo 8 caracteres.",
    "too common": "A senha é muito comum. Escolha outra.",
    "entirely numeric": "A senha não pode ser apenas números.",
    "already exists": "Esse nome de usuário já existe.",
  };

  for (const key in map) {
    if (msg.includes(key)) return map[key];
  }

  return msg;
}
