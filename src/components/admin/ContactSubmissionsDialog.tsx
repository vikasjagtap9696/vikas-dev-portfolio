import { useState } from "react";
import { Mail, Trash2, Eye, EyeOff, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useContactSubmissions, ContactSubmission } from "@/hooks/useContactSubmissions";
import { format } from "date-fns";

export function ContactSubmissionsDialog() {
  const { submissions, isLoading, markAsRead, deleteSubmission, unreadCount } = useContactSubmissions();
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const handleSelect = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.is_read) {
      markAsRead.mutate(submission.id);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Mail className="h-4 w-4" />
          Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Contact Form Submissions</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No contact submissions yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh]">
            {/* Submissions List */}
            <ScrollArea className="border rounded-lg">
              <div className="p-2 space-y-1">
                {submissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => handleSelect(submission)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!submission.is_read && (
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                          <span className="font-medium truncate">{submission.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {submission.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(submission.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Selected Submission Detail */}
            <div className="border rounded-lg p-4 flex flex-col">
              {selectedSubmission ? (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{selectedSubmission.subject}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedSubmission.is_read ? "secondary" : "default"}>
                          {selectedSubmission.is_read ? (
                            <><Eye className="h-3 w-3 mr-1" /> Read</>
                          ) : (
                            <><EyeOff className="h-3 w-3 mr-1" /> Unread</>
                          )}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedSubmission.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <a 
                          href={`mailto:${selectedSubmission.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {selectedSubmission.email}
                        </a>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(selectedSubmission.created_at), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <ScrollArea className="flex-1 mt-2">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </ScrollArea>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        deleteSubmission.mutate(selectedSubmission.id);
                        setSelectedSubmission(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a message to view details
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
