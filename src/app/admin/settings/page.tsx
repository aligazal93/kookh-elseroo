import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getSiteSettings } from "@/features/content/content.service";
export default async function Page() { return <AdminContentEditor page="settings" initialData={await getSiteSettings("ar")} />; }
