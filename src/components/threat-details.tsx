"use client";

import * as React from "react";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ColumnDef,
   getCoreRowModel,
   useReactTable,
   flexRender,
} from "@tanstack/react-table";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { SparklesIcon } from "lucide-react";
import { useChatToggle } from "@/hooks/use-chat-toggle";
import { Message, useMessagesStore } from "@/hooks/use-messages";

interface Threat {
   "CVE-id": string;
   Level: string;
   Affected: string;
   Type?: string;
   Description: string;
   "Agent Name": string;
   "Agent OS": string;
}

const data: Threat[] = [
   {
      "CVE-id": "CVE-2023-25012",
      Level: "High",
      Affected: "linux-6.0.12-1",
      Type: "N/A",
      Description:
         "Use-After-Free in bigben_remove in drivers/hid/hid-bigbenff.c via a crafted USB device because the LED controllers remain registered for too long",
      "Agent Name": "A1069-Server",
      "Agent OS": "Debian GNU/Linux",
   },
   {
      "CVE-id": "CVE-2021-25746",
      Level: "High",
      Affected: "kubectl-ingress-nginx",
      Type: "Information Disclosure",
      Description:
         "a user that can create or update ingress objects can use `.metadata.annotations` in an Ingress object (in the `networking.k8s.io` or `extensions` API group) to obtain the credentials of the ingress-nginx controller. In the default configuration, that credential has access to all secrets in the cluster.",
      "Agent Name": "A3061-ControlNode",
      "Agent OS": "Debian GNU/Linux",
   },
   {
      "CVE-id": "CVE-2021-2388",
      Level: "High",
      Affected: "OpenJDK 8.u292-1",
      Type: "Arbitrary Code Execution",
      Description:
         "A security issue has been found in the Hotspot component of OpenJDK versions 7u301, 8u291, 11.0.11 and 16.0.1. A difficult to exploit vulnerability allows unauthenticated attacker with network access via multiple protocols to compromise OpenJDK. Successful attacks require human interaction from a person other than the attacker. Successful attacks of this vulnerability can result in takeover of OpenJDK.",
      "Agent Name": "A511-Container",
      "Agent OS": "RHEL 9",
   },
   {
      "CVE-id": "CVE-2021-22942",
      Level: "Medium",
      Affected: "gitlab-14.3.3-2",
      Type: "Open Redirect",
      Description:
         "A possible open redirect vulnerability in the Host Authorization middleware in Action Pack >= 6.0.0 before versions 6.1.4.1 and 6.0.4.1 that could allow attackers to redirect users to a malicious website.",
      "Agent Name": "B10-CI/CD",
      "Agent OS": "Alpine GNU/Linux",
   },
   {
      "CVE-id": "CVE-2024-8639",
      Level: "High",
      Affected: "Google Chrome on Android 128.0.6613.137",
      Description:
         "Use after free in Autofill in Google Chrome on Android prior to 128.0.6613.137 allowed a remote attacker to potentially exploit heap corruption via a crafted HTML page.",
      "Agent Name": "A1010-Mobile",
      "Agent OS": "Android 12",
   },
   {
      "CVE-id": "CVE-2024-1234",
      Level: "Critical",
      Affected: "nginx-1.18.0",
      Type: "Remote Code Execution",
      Description:
         "A vulnerability in the NGINX web server allows remote attackers to execute arbitrary code with root privileges.",
      "Agent Name": "C201-Server",
      "Agent OS": "Ubuntu 20.04 LTS",
   },
   {
      "CVE-id": "CVE-2024-5678",
      Level: "Medium",
      Affected: "mysql-8.0.26",
      Type: "SQL Injection",
      Description:
         "An SQL injection vulnerability in MySQL 8.0.26 allows attackers to execute arbitrary SQL commands via a crafted input.",
      "Agent Name": "D301-Database",
      "Agent OS": "CentOS 8",
   },
   {
      "CVE-id": "CVE-2024-9012",
      Level: "High",
      Affected: "apache-tomcat-9.0.50",
      Type: "Information Disclosure",
      Description:
         "Apache Tomcat 9.0.50 contains an information disclosure vulnerability that could allow an attacker to access sensitive information.",
      "Agent Name": "E401-WebApp",
      "Agent OS": "Red Hat Enterprise Linux 8",
   },
   {
      "CVE-id": "CVE-2024-3456",
      Level: "Low",
      Affected: "wordpress-5.8.1",
      Type: "Cross-Site Scripting (XSS)",
      Description:
         "WordPress 5.8.1 is vulnerable to a stored XSS attack in the comments section, allowing attackers to inject malicious scripts.",
      "Agent Name": "F501-CMS",
      "Agent OS": "Debian 10",
   },
   {
      "CVE-id": "CVE-2024-7890",
      Level: "High",
      Affected: "docker-20.10.8",
      Type: "Privilege Escalation",
      Description:
         "A vulnerability in Docker 20.10.8 allows local users to escalate privileges to root, potentially compromising the host system.",
      "Agent Name": "G601-Container",
      "Agent OS": "Fedora 34",
   },
];

const columns: ColumnDef<Threat>[] = [
   {
      header: "CVE Id",
      accessorKey: "CVE-id",
   },
   {
      accessorKey: "Level",
      header: "Severity",
   },
   {
      accessorKey: "Affected",
      header: "Affected",
   },
   {
      accessorKey: "Type",
      header: "Type",
   },
   {
      accessorKey: "Agent OS",
      header: "Operating System",
   },
   {
      accessorKey: "Agent Name",
      header: "Agent Name",
   },
   {
      id: "ai",
      cell: ({ row }) => <AskThreat threat={row.original} />,
   },
];

export function AskThreat(props: { threat: Threat }) {
   const { setIsOpen } = useChatToggle();
   const { addMessage } = useMessagesStore();

   const newMessage: Message = {
      id: Date.now().toString(),
      content: `I need help with ${props.threat["CVE-id"]}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
   };

   return (
      <SparklesIcon
         onClick={() => {
            setIsOpen(true);
            addMessage(newMessage);
         }}
         className="h-4 w-4 opacity-60 cursor-pointer hover:opacity-100"
      />
   );
}

export function ThreatDetails() {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <Card className="col-span-2">
         <CardHeader>
            <CardTitle>Threat Details</CardTitle>
            <CardDescription>Details of active threats</CardDescription>
         </CardHeader>
         <CardContent className="px-2 sm:p-6">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
}
