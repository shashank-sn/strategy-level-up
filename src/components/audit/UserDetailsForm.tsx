import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UserDetails } from "@/pages/BrandAudit";

interface UserDetailsFormProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const industries = [
  "SaaS", "E-commerce", "Consulting", "Retail", "Healthcare", "Education", 
  "Finance", "Real Estate", "Technology", "Marketing Agency", "Food & Beverage",
  "Fitness & Wellness", "Manufacturing", "Non-profit", "Other"
];

const roles = [
  "Founder/CEO", "Marketing Manager", "Marketing Director", "Brand Manager",
  "Business Owner", "Freelancer", "Consultant", "Student", "Other"
];

const UserDetailsForm = ({ userDetails, setUserDetails, onNext, onPrevious }: UserDetailsFormProps) => {
  const isFormValid = userDetails.name && userDetails.role && userDetails.industry;

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell Us About Yourself</CardTitle>
        <CardDescription>
          Help us personalize your brand audit experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={userDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Your Role *</Label>
            <Select
              value={userDetails.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select
              value={userDetails.industry}
              onValueChange={(value) => handleInputChange("industry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="Your company name (optional)"
              value={userDetails.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            placeholder="https://yourwebsite.com (optional)"
            value={userDetails.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!isFormValid}>
            Continue to Assessment
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsForm;