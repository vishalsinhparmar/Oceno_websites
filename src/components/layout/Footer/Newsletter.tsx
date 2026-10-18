import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { assets } from "@/lib/assets";
import { easeOut } from "@/lib/motion";

/** Pill email capture. Swap `onSubmit` for the real list endpoint when it exists. */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setDone(true);
  };

  return (
    <div className="w-full lg:w-[480px] lg:shrink-0">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="rounded-full border border-oceno-deep-line bg-white/[0.06] px-[22px] py-[17px] font-manrope-regular text-[16px] leading-[26px] font-normal text-white"
          >
            Thanks — we&apos;ll send new collections to <span className="font-manrope-semibold font-semibold">{email}</span>.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex w-full items-center gap-[8px] rounded-full border border-oceno-deep-line bg-white/[0.06] py-[6px] pr-[6px] pl-[22px] transition-[border-color,box-shadow] duration-300 focus-within:border-oceno-blue-bright focus-within:shadow-[0_0_0_4px_rgba(61,114,255,0.18)]"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Business email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your business email"
              className="min-w-0 flex-1 bg-transparent font-manrope-regular text-[16px] leading-[26px] font-normal text-white outline-none placeholder:text-oceno-muted"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center gap-[10px] rounded-full bg-oceno-blue px-[20px] py-[14px] text-white transition-[background-color,transform] duration-200 ease-out hover:bg-oceno-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] sm:px-[26px]"
            >
              <span className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] whitespace-nowrap">
                Subscribe
              </span>
              <img
                src={assets.iconArrowRight}
                alt=""
                width={18}
                height={18}
                className="hidden size-[18px] transition-transform duration-200 group-hover:translate-x-[3px] sm:block"
              />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
