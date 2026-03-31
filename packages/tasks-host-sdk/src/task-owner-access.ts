import { parseAgentSessionKey } from "../../../src/routing/session-key.js";

function normalizeSessionKey(value: string | undefined | null): string {
  return (value ?? "").trim();
}

export function canCallerAccessOwnedSession(params: {
  callerSessionKey: string;
  ownerSessionKey: string;
}): boolean {
  const callerSessionKey = normalizeSessionKey(params.callerSessionKey);
  const ownerSessionKey = normalizeSessionKey(params.ownerSessionKey);
  if (!ownerSessionKey) {
    return false;
  }
  if (!callerSessionKey) {
    return false;
  }
  if (callerSessionKey === ownerSessionKey) {
    return true;
  }
  const caller = parseAgentSessionKey(callerSessionKey);
  const owner = parseAgentSessionKey(ownerSessionKey);
  if (!caller || !owner) {
    return false;
  }
  return caller.agentId === owner.agentId;
}

export function assertCallerAccessOwnedSession(params: {
  callerSessionKey: string;
  ownerSessionKey: string;
  subject: "flow" | "task";
  subjectId?: string;
}) {
  if (canCallerAccessOwnedSession(params)) {
    return;
  }
  const suffix = params.subjectId?.trim() ? ` ${params.subjectId.trim()}` : "";
  throw new Error(`Access denied for ${params.subject}${suffix}.`);
}
