import { useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SessionTimerProps {
  initialMinutes?: number;
  warningMinutes?: number;
  onSessionExpire?: () => void;
}

export function SessionTimer({
  initialMinutes = 30,
  warningMinutes = 5,
  onSessionExpire,
}: SessionTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [showWarning, setShowWarning] = useState(false);
  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onSessionExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onSessionExpire, isExtended]);

  useEffect(() => {
    if (secondsRemaining <= warningMinutes * 60 && secondsRemaining > 0) {
      setShowWarning(true);
    }
  }, [secondsRemaining, warningMinutes]);

  const extendSession = () => {
    setSecondsRemaining(initialMinutes * 60);
    setShowWarning(false);
    setIsExtended(true);
    setTimeout(() => setIsExtended(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getColorClass = () => {
    const minutes = secondsRemaining / 60;
    if (minutes <= 5) return "text-red-600 dark:text-red-400";
    if (minutes <= 15) return "text-orange-600 dark:text-orange-400";
    return "text-emerald-600 dark:text-emerald-400";
  };

  const getBgClass = () => {
    const minutes = secondsRemaining / 60;
    if (minutes <= 5)
      return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
    if (minutes <= 15)
      return "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800";
    return "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800";
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${getBgClass()}`}
            >
              <Clock className={`size-4 ${getColorClass()}`} />
              <span className={`text-xs ${getColorClass()}`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                {formatTime(secondsRemaining)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  extendSession();
                }}
                className="ml-1 p-1 hover:bg-white/50 dark:hover:bg-black/20 rounded transition-colors"
              >
                <RefreshCw className={`size-3 ${getColorClass()}`} />
              </button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Session time remaining</p>
            <p className="text-xs text-gray-400">Click refresh to extend</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Warning Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent aria-describedby="session-warning-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="size-5 text-orange-600" />
              Session Expiring Soon
            </DialogTitle>
            <DialogDescription id="session-warning-description">
              Your session will expire in {formatTime(secondsRemaining)}. Would you like to extend your session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarning(false)}>
              Dismiss
            </Button>
            <Button
              onClick={extendSession}
              className="bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white"
            >
              Extend Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extended Confirmation */}
      <AnimatePresence>
        {isExtended && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            <p className="text-sm flex items-center gap-2">
              <RefreshCw className="size-4" />
              Session extended successfully!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}