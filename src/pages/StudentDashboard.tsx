import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import commonSkillsData from "@/data/skills.json";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import StatsCards from "@/components/student/StatsCards";
import PersonalInfoSection from "@/components/student/PersonalInfoSection";
import InternshipPreferencesSection from "@/components/student/InternshipPreferencesSection";
import SkillsSection from "@/components/student/SkillsSection";
import ProjectsSection from "@/components/student/ProjectsSection";
import CertificationsSection from "@/components/student/CertificationsSection";

const StudentDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Array<{id?: string, title: string, description: string, technologies: string[], video_url?: string}>>([]);
  const [certifications, setCertifications] = useState<Array<{
    id?: string;
    certification_name: string;
    issuing_organization: string;
    issue_date: string;
    expiry_date: string;
    credential_id: string;
    credential_url: string;
    certificate_file_url?: string;
    certificate_filename?: string;
  }>>([]);
  const [profileViews, setProfileViews] = useState(0);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  
  // Generate graduation year options from 2015 to 2030
  const graduationYearOptions = Array.from({ length: 16 }, (_, i) => {
    const year = 2015 + i;
    return year.toString();
  });
  
  // Comprehensive skills list
  const commonSkills: string[] = commonSkillsData;
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    university: "",
    major: "",
    graduation_year: "",
    bio: "",
    location: "",
    github_url: "",
    website_url: "",
    linkedin_url: "",
    internship_type_preference: "",
    preferred_internship_location: "",
    preferred_locations: [] as string[],
    open_to_relocate: false,
    multiple_website_urls: [] as string[],
  });

  // Load existing profile data
  useEffect(() => {
    if (user) {
      loadProfile();
      loadProjects();
      loadCertifications();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data: profile, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error loading profile:', error);
      return;
    }

    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        university: profile.university || "",
        major: profile.major || "",
        graduation_year: profile.graduation_year || "",
        bio: profile.bio || "",
        location: profile.location || "",
        github_url: profile.github_url || "",
        website_url: profile.website_url || "",
        linkedin_url: profile.linkedin_url || "",
        internship_type_preference: profile.internship_type_preference || "",
        preferred_internship_location: profile.preferred_internship_location || "",
        preferred_locations: profile.preferred_locations || [],
        open_to_relocate: profile.open_to_relocate || false,
        multiple_website_urls: profile.multiple_website_urls || [],
      });
      setSkills(profile.skills || []);
      setProfileViews(profile.profile_views || 0);
      setStudentProfile(profile);
    }
  };

  const loadProjects = async () => {
    if (!user) return;

    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (studentProfile) {
      const { data: projectsData, error } = await supabase
        .from('student_projects')
        .select('*')
        .eq('student_id', studentProfile.id);

      if (!error && projectsData) {
        setProjects(projectsData.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description || "",
          technologies: p.technologies || [],
          video_url: p.video_url
        })));
      }
    }
  };

  const loadCertifications = async () => {
    if (!user) return;

    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (studentProfile) {
      const { data: certificationsData, error } = await supabase
        .from('student_certifications')
        .select('*')
        .eq('student_id', studentProfile.id);

      if (!error && certificationsData) {
        setCertifications(certificationsData.map(cert => ({
          id: cert.id,
          certification_name: cert.certification_name,
          issuing_organization: cert.issuing_organization || "",
          issue_date: cert.issue_date || "",
          expiry_date: cert.expiry_date || "",
          credential_id: cert.credential_id || "",
          credential_url: cert.credential_url || "",
          certificate_file_url: cert.certificate_file_url,
          certificate_filename: cert.certificate_filename
        })));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('student_profiles')
        .upsert({
          user_id: user.id,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          university: formData.university,
          major: formData.major,
          graduation_year: formData.graduation_year,
          bio: formData.bio,
          location: formData.location,
          github_url: formData.github_url,
          website_url: formData.website_url,
          linkedin_url: formData.linkedin_url,
          internship_type_preference: formData.internship_type_preference,
          preferred_internship_location: formData.preferred_internship_location,
          preferred_locations: formData.preferred_locations,
          open_to_relocate: formData.open_to_relocate,
          multiple_website_urls: formData.multiple_website_urls,
          skills: skills,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (profileError) throw profileError;

      // Get student profile ID for projects and certifications
      const { data: studentProfile } = await supabase
        .from('student_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (studentProfile) {
        // Delete existing projects
        await supabase
          .from('student_projects')
          .delete()
          .eq('student_id', studentProfile.id);

        // Insert new projects
        if (projects.length > 0) {
          const projectsToInsert = projects
            .filter(p => p.title.trim())
            .map(project => ({
              student_id: studentProfile.id,
              title: project.title,
              description: project.description,
              technologies: project.technologies,
              video_url: project.video_url
            }));

          if (projectsToInsert.length > 0) {
            const { error: projectsError } = await supabase
              .from('student_projects')
              .insert(projectsToInsert);

            if (projectsError) throw projectsError;
          }
        }

        // Delete existing certifications
        await supabase
          .from('student_certifications')
          .delete()
          .eq('student_id', studentProfile.id);

        // Insert new certifications
        if (certifications.length > 0) {
          const certificationsToInsert = certifications
            .filter(cert => cert.certification_name.trim())
            .map(certification => ({
              student_id: studentProfile.id,
              certification_name: certification.certification_name,
              issuing_organization: certification.issuing_organization,
              issue_date: certification.issue_date || null,
              expiry_date: certification.expiry_date || null,
              credential_id: certification.credential_id,
              credential_url: certification.credential_url,
              certificate_file_url: certification.certificate_file_url,
              certificate_filename: certification.certificate_filename
            }));

          if (certificationsToInsert.length > 0) {
            const { error: certificationsError } = await supabase
              .from('student_certifications')
              .insert(certificationsToInsert);

            if (certificationsError) throw certificationsError;
          }
        }
      }

      toast({
        title: "Profile saved successfully!",
        description: "Your profile is now visible to recruiters.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-xl text-gray-600">Build your profile and get discovered by top recruiters</p>
        </div>

        <StatsCards
          profileViews={profileViews}
          skillsCount={skills.length}
          projectsCount={projects.length}
          studentProfile={studentProfile}
          skills={skills}
          projects={projects}
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalInfoSection
            formData={formData}
            setFormData={setFormData}
            graduationYearOptions={graduationYearOptions}
          />

          <InternshipPreferencesSection
            formData={formData}
            setFormData={setFormData}
          />

          <SkillsSection
            skills={skills}
            setSkills={setSkills}
            commonSkills={commonSkills}
          />

          <ProjectsSection
            projects={projects}
            setProjects={setProjects}
            commonSkills={commonSkills}
          />

          <CertificationsSection
            certifications={certifications}
            setCertifications={setCertifications}
          />

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
