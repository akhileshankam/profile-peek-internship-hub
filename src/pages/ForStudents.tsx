
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Code, Briefcase, ArrowRight, CheckCircle, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const ForStudents = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Land Your Dream Internship with 
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Your Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Skip the GPA competition. Show companies what you can actually build and get hired 
            for your coding skills, not your grades.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8"
          >
            Start Building Your Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Students Choose lazyIntern</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Skills Over Grades</h3>
                  <p className="text-gray-600">Get recognized for what you can build, not just your academic performance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Direct Company Access</h3>
                  <p className="text-gray-600">Connect directly with hiring managers who value practical experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Project-Based Matching</h3>
                  <p className="text-gray-600">Get matched with roles that align with your project experience and interests.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">No University Bias</h3>
                  <p className="text-gray-600">Your talent matters more than your university ranking or location.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900">Project Showcase</h3>
                <p className="text-gray-600">Display Your Work</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Briefcase className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900">Direct Matching</h3>
                <p className="text-gray-600">Connect with Companies</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900">Skill-Based</h3>
                <p className="text-gray-600">Beyond Academics</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900">Fast Track</h3>
                <p className="text-gray-600">Quick Connections</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What to Include Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Makes a Great Student Profile</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-blue-600" />
                  Coding Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 mb-4">Showcase your best work with detailed project descriptions:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Web applications and mobile apps</li>
                  <li>• Open source contributions</li>
                  <li>• Personal coding challenges</li>
                  <li>• Hackathon projects</li>
                  <li>• Course assignments (impressive ones)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-teal-600" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 mb-4">List your programming languages and technologies:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Programming languages (Python, Java, etc.)</li>
                  <li>• Frameworks (React, Django, etc.)</li>
                  <li>• Databases (SQL, MongoDB, etc.)</li>
                  <li>• Tools (Git, Docker, etc.)</li>
                  <li>• Cloud platforms (AWS, Azure, etc.)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                  Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 mb-4">Connect your online presence and portfolio:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• GitHub profile with active repositories</li>
                  <li>• LinkedIn professional profile</li>
                  <li>• Personal portfolio website</li>
                  <li>• Live project demos</li>
                  <li>• Technical blog or articles</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Project-Based Hiring Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Show, Don't Tell</h3>
                    <p className="text-gray-600 text-sm">Demonstrate your abilities</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Your projects speak louder than your grades. Companies can see exactly what you're capable of 
                  building and how you approach problem-solving through your actual work."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Level Playing Field</h3>
                    <p className="text-gray-600 text-sm">Equal opportunity for all</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Whether you're from a top university or teaching yourself, your skills and projects 
                  matter most. Great talent comes from everywhere, and we help companies find it."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Showcase Your Coding Skills?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join talented students who are getting discovered through project-based hiring.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Your Profile Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForStudents;
