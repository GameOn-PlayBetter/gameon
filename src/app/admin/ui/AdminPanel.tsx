// src/app/admin/ui/AdminPanel.tsx
"use client";

import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Tabs } from "@/ui/components/Tabs";
import { Table } from "@/ui/components/Table";
import { Avatar } from "@/ui/components/Avatar";
import { Progress } from "@/ui/components/Progress";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Alert } from "@/ui/components/Alert";
import { IconButton } from "@/ui/components/IconButton";
import { useRouter } from "next/navigation";
import {
  FeatherSettings,
  FeatherUserPlus,
  FeatherEdit2,
  FeatherLock,
  FeatherLogOut,
  FeatherRefreshCw,
  FeatherAlertTriangle,
  FeatherClock,
  FeatherCheck,
  FeatherX,
  FeatherDatabase,
  FeatherActivity,
  FeatherUsers,
  FeatherVideo,
} from "@subframe/core";

export default function AdminPanel() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    router.push("/login");
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full flex-col items-start gap-8 px-12 pt-12 pb-6">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                Administration Panel
              </span>
              <Badge variant="error">Admin Only</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="neutral-secondary">
                <FeatherRefreshCw className="mr-2 h-4 w-4" />
                Sync Data
              </Button>
              <Button>
                <FeatherSettings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
              <Button variant="destructive-secondary" onClick={handleLogout}>
                <FeatherLogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground icon={<FeatherUsers />} />
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Total Users
                </span>
              </div>
              <span className="text-heading-1 font-heading-1 text-brand-500">1,234</span>
              <div className="flex w-full items-center gap-2">
                <Progress value={75} />
                <span className="text-caption font-caption text-brand-500">+15% growth</span>
              </div>
            </div>

            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground variant="success" icon={<FeatherVideo />} />
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Active Sessions
                </span>
              </div>
              <span className="text-heading-1 font-heading-1 text-success-600">42</span>
              <div className="flex w-full items-center gap-2">
                <Progress value={85} />
                <span className="text-caption font-caption text-success-600">Normal load</span>
              </div>
            </div>

            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground variant="warning" icon={<FeatherAlertTriangle />} />
                <span className="text-heading-3 font-heading-3 text-default-font">
                  System Alerts
                </span>
              </div>
              <span className="text-heading-1 font-heading-1 text-warning-700">3</span>
              <div className="flex w-full items-center gap-2">
                <Progress value={30} />
                <span className="text-caption font-caption text-warning-700">Requires attention</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item active={true}>Coaches</Tabs.Item>
            <Tabs.Item>Players</Tabs.Item>
            <Tabs.Item>Reports</Tabs.Item>
            <Tabs.Item>Settings</Tabs.Item>
          </Tabs>
        </div>

        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 overflow-auto">
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">Coach Management</span>
              <Button>
                <FeatherUserPlus className="mr-2 h-4 w-4" />
                Add New Coach
              </Button>
            </div>

            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Coach</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Games</Table.HeaderCell>
                  <Table.HeaderCell>Sessions</Table.HeaderCell>
                  <Table.HeaderCell>Rating</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar size="small" image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde">A</Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-default-font">Alex Chen</span>
                      <span className="text-caption font-caption text-subtext-color">alex@example.com</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success">Active</Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Badge>Minecraft</Badge>
                    <Badge>DBD</Badge>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-500">156</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-success-600">4.8/5</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button variant="neutral-secondary" size="small">
                      <FeatherEdit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive-secondary" size="small">
                      <FeatherLock className="mr-2 h-4 w-4" />
                      Reset Pass
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar size="small" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330">S</Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-default-font">Sarah Wilson</span>
                      <span className="text-caption font-caption text-subtext-color">sarah@example.com</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="warning">Pending</Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Badge>Mario Party</Badge>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-500">89</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-success-600">4.6/5</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button variant="neutral-secondary" size="small">
                      <FeatherEdit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive-secondary" size="small">
                      <FeatherLock className="mr-2 h-4 w-4" />
                      Reset Pass
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">System Alerts</span>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <Alert
                variant="error"
                icon={<FeatherAlertTriangle />}
                title="High Server Load Detected"
                description="Server load has exceeded 80% capacity in the last hour."
                actions={<Button variant="destructive-primary">View Details</Button>}
              />
              <Alert
                variant="warning"
                icon={<FeatherClock />}
                title="Session Scheduling Conflict"
                description="Multiple sessions scheduled for Coach Alex at 3PM."
                actions={<Button variant="neutral-secondary">Resolve</Button>}
              />
              <Alert
                variant="success"
                icon={<FeatherCheck />}
                title="Backup Completed"
                description="System backup completed successfully at 2:00 AM."
                actions={<IconButton icon={<FeatherX />} />}
              />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-start gap-6">
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground icon={<FeatherSettings />} />
                <span className="text-heading-3 font-heading-3 text-default-font">Quick Actions</span>
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <Button className="w-full" variant="neutral-secondary">
                  <FeatherUserPlus className="mr-2 h-4 w-4" />
                  Approve New Coaches
                </Button>
                <Button className="w-full" variant="neutral-secondary">
                  <FeatherRefreshCw className="mr-2 h-4 w-4" />
                  Reset User Password
                </Button>
                <Button className="w-full" variant="neutral-secondary">
                  <FeatherDatabase className="mr-2 h-4 w-4" />
                  Backup System
                </Button>
              </div>
            </div>

            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground icon={<FeatherActivity />} />
                <span className="text-heading-3 font-heading-3 text-default-font">System Health</span>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-body font-body text-default-font">Server Load</span>
                    <span className="text-body-bold font-body-bold text-success-600">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-body font-body text-default-font">Storage</span>
                    <span className="text-body-bold font-body-bold text-warning-700">82%</span>
                  </div>
                  <Progress value={82} />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-body font-body text-default-font">Memory</span>
                    <span className="text-body-bold font-body-bold text-success-600">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}