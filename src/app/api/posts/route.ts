import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      id: 1,
      title: "فوائد الرعاية المنزلية",
      content: "الرعاية المنزلية بتساعد كبار السن على البقاء في بيئة مريحة وآمنة."
    },
    {
      id: 2,
      title: "نصائح لمرضى السكر",
      content: "يُفضل متابعة الحالة بانتظام وتجنب الأطعمة الغنية بالسكريات."
    },
    {
      id: 3,
      title: "أهمية التمريض المنزلي",
      content: "التمريض المنزلي بيوفر راحة نفسية ودعم طبي مستمر للمريض."
    }
  ];

  return NextResponse.json(posts);
}