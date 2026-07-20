export type LeadFormState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; values: Record<string, string> }
  | {
      status: "success";
      message: string;
      delivered: boolean;
      leadId?: string;
    };

export const initialLeadState: LeadFormState = { status: "idle" };
