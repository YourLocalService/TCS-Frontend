import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { serviceContent } from "@/data/serviceContent";

const data = serviceContent["remont"];

export const metadata: Metadata = {
  title: `${data.metaTitle} | TCS Canada`,
  description: data.subtitle,
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
