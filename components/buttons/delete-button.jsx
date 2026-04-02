"use client";

import ButtonTooltip from "@/components/buttons/button-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api, ErrorMessage } from "@/lib/data/utils";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const translations = {
  en: {
    delete: "Delete",
    deleteTitle: 'Delete "{name}"',
    deleteDescription:
      "You are about to delete {name}. This action cannot be undone.",
    irreversibleWarning: "This action is irreversible. Please confirm.",
    levelsWarning: "Items will also be deleted",
    associatedContentWarning:
      "All associated content will be permanently removed.",
    confirmLabel: "Type DELETE to confirm",
    confirmPlaceholder: "DELETE",
    cancel: "Cancel",
    deleteButton: "Delete {name}",
    successMessage: "The {name} has been successfully removed 🗑️",
  },
  ar: {
    delete: "حذف",
    deleteTitle: 'حذف "{name}"',
    deleteDescription:
      "أنت على وشك حذف {name}. لا يمكن التراجع عن هذا الإجراء.",
    irreversibleWarning: "هذا الإجراء لا رجعة فيه. يرجى التأكيد.",
    levelsWarning: "عناصر سيتم حذفها أيضًا",
    associatedContentWarning: "سيتم إزالة كل المحتوى المرتبط بشكل دائم.",
    confirmLabel: "اكتب DELETE للتأكيد",
    confirmPlaceholder: "DELETE",
    cancel: "إلغاء",
    deleteButton: "حذف {name}",
    successMessage: "تم إزالة {name} بنجاح 🗑️",
  },
};

const DeleteButton = ({ apiLink, onSuccess, children, count, name }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const { currentLanguage } = useLanguageStore();
  const t = translations?.[currentLanguage] || translations?.en;

  const confirmationWord = "DELETE";
  const isConfirmEnabled = confirmText.toUpperCase() === confirmationWord;

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.delete(apiLink);
      toast.success(t.successMessage.replace("{name}", name));

      if (onSuccess) await onSuccess();
      setOpen(false);
    } catch (error) {
      toast.error(ErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <ButtonTooltip content={<Trash2 />} tooltip={t.delete} />
        )}
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md"
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <DialogTitle className="text-red-500">
              {t.deleteTitle.replace("{name}", name)}
            </DialogTitle>
          </div>
          <DialogDescription>
            {t.deleteDescription.replace("{name}", name)}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
            <p className="text-sm font-medium text-red-500">
              {t.irreversibleWarning}
            </p>
          </div>

          {count != null && (
            <div className="pl-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-background">
                  {count}
                </Badge>
                <span className="text-sm">{t.levelsWarning}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.associatedContentWarning}
              </p>
            </div>
          )}
        </div>

        {/* <div className="space-y-2">
          <label htmlFor="confirm" className="text-sm font-medium">
            {t.confirmLabel}
          </label>
          <Input
            id="confirm"
            value={confirmText}
            autoComplete="off"
            onChange={(e) => setConfirmText(e.target.value)}
            className={
              !isConfirmEnabled
                ? "border-destructive focus-visible:ring-0"
                : "border-green-500 focus-visible:ring-0"
            }
            placeholder={t.confirmPlaceholder}
          />
        </div> */}

        <DialogFooter className="sm:justify-between gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            // disabled={loading || !isConfirmEnabled}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {t.deleteButton.replace("{name}", name)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
