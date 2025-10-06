import { BookOpen } from "lucide-react";
import React from "react";

const SkillCard = ({ skill, getCategoryColor, getProficiencyColor }: any) => {
    return (
        <div
            key={skill._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
        >
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                    <div
                        className={`${getCategoryColor(
                            skill.category
                        )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                    >
                        {skill.category}
                    </div>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(
                            skill.proficiency
                        )}`}
                    >
                        {skill.proficiency}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {skill.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {skill.description}
                </p>
            </div>

            {/* Tags */}
            {skill.tags.length > 0 && (
                <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                        {skill.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                        {skill.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">
                                +{skill.tags.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Instructor */}
            {/* <div className="px-6 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                    {skill.userId.avatar ? (
                        <img
                            src={skill.userId.avatar}
                            alt={skill.userId.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        getInitials(skill.userId.name)
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {skill.userId.name}
                    </p>
                    <p className="text-xs text-gray-500">Skill Provider</p>
                </div>
            </div> */}

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Connect
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-gray-600 hover:text-gray-900">
                    <BookOpen className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default SkillCard;
