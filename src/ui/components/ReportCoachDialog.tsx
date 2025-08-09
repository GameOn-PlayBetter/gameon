"use client";

import React, { useEffect, useState } from "react";
import Dialog from "@/ui/components/Dialog";
import { Alert } from "@/ui/components/Alert";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { Select } from "@/ui/components/Select";
import { TextArea } from "@/ui/components/TextArea";
import { Avatar } from "@/ui/components/Avatar";
import {
  FeatherX,
  FeatherAlertTriangle,
  FeatherFlag,
  FeatherUser,
} from "@subframe/core";

type ReportData = {
  coach: string;
  reason: string;
  details: string;
};

interface ReportCoachDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** If provided, the dialog pre-fills and locks the Coach select */
  coachName?: string;

  /** Called when user confirms submit */
  onSubmit: (data: ReportData) => void;
}

const COACHES = ["Coach Alex", "Coach Sarah", "Coach Mike"] as const;

export default function ReportCoachDialog({
  open,
  onOpenChange,
  coachName,
  onSubmit,
}: ReportCoachDialogProps) {
  const [coach, setCoach] = useState<string>(coachName || "");
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  // keep internal state in sync if parent opens for a specific coach
  useEffect(() => {
    if (open) {
      setCoach(coachName || "");
      setReason("");
      setDetails("");
    }
  }, [open, coachName]);

  const canSubmit = (coach && reason && details.trim().length > 0);

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({ coach, reason, details: details.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="w-full max-w-lg p-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-2 font-heading-2 text-error-700">Report Coach</span>
          <IconButton variant="neutral-tertiary" icon={<FeatherX />} onClick={() => onOpenChange(false)} />
        </div>

        {/* Optional header w/ avatar if a coach is preselected */}
        {coach ? (
          <div className="mt-4 flex w-full items-center gap-3">
            <Avatar
              size="large"
              image={
                coach === "Coach Alex"
                  ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
                  : coach === "Coach Sarah"
                  ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
                  : undefined
              }
            >
              {(coach.split(" ")[1] || "?").at(0)}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-heading-3 font-heading-3 text-default-font">{coach}</span>
              <span className="text-caption font-caption text-subtext-color">Session report</span>
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <Alert
            variant="error"
            icon={<FeatherAlertTriangle />}
            title="Please only report serious violations"
            description="False reports may result in account restrictions. All reports are reviewed by our moderation team."
          />
        </div>

        <div className="mt-6 flex w-full flex-col items-start gap-6">
          <Select
            className="h-auto w-full flex-none"
            label="Coach"
            placeholder="Choose a coach to report"
            icon={<FeatherUser />}
            value={coach}
            onValueChange={(v: string) => setCoach(v)}
            disabled={Boolean(coachName)} // lock if prefilled from a row click
          >
            {COACHES.map((c) => (
              <Select.Item key={c} value={c}>{c}</Select.Item>
            ))}
          </Select>

          <Select
            className="h-auto w-full flex-none"
            label="Reason"
            placeholder="Select a reason"
            icon={<FeatherFlag />}
            value={reason}
            onValueChange={(v: string) => setReason(v)}
          >
            <Select.Item value="inappropriate">Inappropriate Behavior</Select.Item>
            <Select.Item value="noshow">No-show/Late to Session</Select.Item>
            <Select.Item value="quality">Poor Session Quality</Select.Item>
            <Select.Item value="harassment">Harassment</Select.Item>
            <Select.Item value="other">Other</Select.Item>
          </Select>

          <TextArea className="w-full" label="Description" helpText="Please provide specific details">
            <TextArea.Input
              className="h-auto min-h-[96px] w-full flex-none"
              placeholder="Describe what happened..."
              value={details}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)}
            />
          </TextArea>
        </div>

        <div className="mt-6 flex w-full items-center justify-end gap-2">
          <Button variant="neutral-secondary" icon={<FeatherX />} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive-primary"
            icon={<FeatherFlag />}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit Report
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}