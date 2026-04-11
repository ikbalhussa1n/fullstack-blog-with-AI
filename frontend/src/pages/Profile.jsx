import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, User, Shield, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
      >
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-chart-1 via-primary to-chart-5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>

        <div className="px-6 md:px-8 pb-8 relative">
          {/* Avatar + Role Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div className="-mt-16 relative">
              <img
                src={user?.photo?.url || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                alt="Profile"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-card object-cover bg-muted shadow-lg"
              />
            </div>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
              <Shield className="w-3.5 h-3.5" />
              {user?.role || "User"}
            </span>
          </div>

          {/* Name + Email */}
          <h1 className="text-3xl font-bold mb-1">{user?.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2 mb-8 text-sm">
            <Mail className="w-4 h-4" /> {user?.email}
          </p>

          {/* Account Info Grid */}
          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">
                  Full Name
                </p>
                <p className="font-medium flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" /> {user?.name}
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">
                  Email Address
                </p>
                <p className="font-medium flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" /> {user?.email}
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">
                  Role
                </p>
                <p className="font-medium flex items-center gap-2 text-sm capitalize">
                  <Shield className="w-4 h-4 text-muted-foreground" /> {user?.role || "User"}
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">
                  Member Since
                </p>
                <p className="font-medium flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" /> Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
