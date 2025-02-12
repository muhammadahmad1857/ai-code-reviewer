"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getReview } from "@/app/actions/getReview";

const commonLanguages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [otherLanguage, setOtherLanguage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    if (value !== "other") {
      setOtherLanguage("");
    }
  };

  const handleReview = async () => {
    setIsReviewing(true);
    setAiResponse("");
    const reviewLanguage = language === "other" ? otherLanguage : language;
    try {
      const review = await getReview(reviewLanguage, code);
      setAiResponse(review);
    } catch (error) {
      console.error("Error fetching review:", error);
      setAiResponse("Failed to fetch review. Please try again later.");
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <main className="flex-grow p-6">
        <motion.div
          className="max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Code Review
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              className="space-y-4"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="language-select">Select Language</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={language}
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonLanguages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {language === "other" && (
                        <Input
                          placeholder="Enter language"
                          value={otherLanguage}
                          onChange={(e) => setOtherLanguage(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Editor
                      height="50vh"
                      language={language !== "other" ? language : undefined}
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                      }}
                      className="relative z-10 border p-4 border-primary/20 rounded-md overflow-hidden"
                    />
                  </div>
                  <Button
                    onClick={handleReview}
                    disabled={isReviewing}
                    className="w-full transition-all duration-200 hover:bg-primary/90 hover:scale-105 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isReviewing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                          Reviewing...
                        </>
                      ) : (
                        "Review Code"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 space-y-4">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    AI Review
                  </h2>
                  <div className="relative">
                    <Textarea
                      value={aiResponse}
                      readOnly
                      className="h-[60vh] resize-none font-mono text-sm relative z-10 bg-transparent border border-primary/20 rounded-md"
                      placeholder="AI review will appear here..."
                    />
                    {isReviewing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
