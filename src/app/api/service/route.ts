import { handleSupportRequest } from "@/lib/support-request-handler";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return handleSupportRequest(req, "service");
}
