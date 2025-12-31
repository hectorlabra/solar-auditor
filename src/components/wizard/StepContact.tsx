"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuditStore } from "@/store/audit-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LockKeyhole, Sparkles } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Ingresa un email válido"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function StepContact() {
  const { setContact } = useAuditStore();
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
    router.push("/result");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-[400px] flex flex-col items-center justify-center"
    >
      {/* Blurred "Result Preview" Background (FOMO Effect) */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none select-none blur-sm grayscale-[30%]">
        <div className="w-full h-32 mt-10 bg-gradient-to-t from-green-500/40 to-transparent rounded-t-full" />
        <div className="grid grid-cols-2 gap-4 p-4 mt-4">
          <div className="h-24 bg-muted/50 rounded-lg" />
          <div className="h-24 bg-muted/50 rounded-lg" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm bg-background/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-primary/10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full ring-2 ring-primary/20">
            <LockKeyhole className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Análisis Terminado
        </h2>
        <p className="text-center text-muted-foreground mb-6 text-sm">
          Hemos encontrado una oportunidad de ahorro significativa. Desbloquea
          tu reporte completo ahora.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs uppercase tracking-wide text-muted-foreground"
            >
              Nombre Completo
            </Label>
            <Input
              id="name"
              placeholder="Ej: Juan Pérez"
              className="bg-background/50 border-primary/20 focus:border-primary/50 h-11"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs uppercase tracking-wide text-muted-foreground"
            >
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@empresa.com"
              className="bg-background/50 border-primary/20 focus:border-primary/50 h-11"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ver Mi Ahorro
          </Button>
        </form>

        <p className="text-[10px] text-center text-muted-foreground/50 mt-6">
          Tus datos están protegidos bajo estándares internacionales de
          privacidad.
        </p>
      </div>
    </motion.div>
  );
}
