"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuditStore } from "@/store/audit-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Ingresa un email válido"),
});

type ContactForm = z.infer<typeof contactSchema>;

// Format CLP
function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function StepContact() {
  const { result, setContact } = useAuditStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setContact(data.name, data.email);
    // Here you would typically send to backend/CRM
    router.push("/result");
  };

  const annualSavings = result?.annualSavings || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mb-4"
      >
        <Sparkles className="w-12 h-12 text-amber-400" />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        ¡Tu análisis está listo!
      </h2>

      {/* Teaser */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm">
            Detectamos un ahorro potencial de{" "}
            <strong className="text-green-600">
              {formatCLP(annualSavings)}/año
            </strong>
          </span>
        </div>
      </Card>

      <p className="text-muted-foreground text-center mb-6">
        Ingresa tus datos para ver el informe completo
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            placeholder="Tu nombre"
            className="h-12"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="h-12"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold"
        >
          Ver Informe Completo
        </Button>
      </form>

      {/* Privacy note */}
      <p className="text-xs text-muted-foreground mt-4 text-center max-w-sm">
        🔒 Tus datos están seguros. No compartimos tu información con terceros.
      </p>
    </motion.div>
  );
}
