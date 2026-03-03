"use client";
import Layout from "y@/app/components/Layout";
import { useMemo, useState, useCallback } from "react";
import Button from "y@/app/components/Button";
import Input from "y@/app/components/Input";
import Modal from "y@/app/components/ModalShell";
import SearchBar from "y@/app/components/SearchBar";
import { FiEdit3, FiUserCheck, FiUserMinus, FiUsers } from "react-icons/fi";
import { MdOutlineBlock } from "react-icons/md";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable member component
function MemberItem({ member, onDeactivate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: member.id });
  const initials = member.name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
      }}
      className={`flex justify-between items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg cursor-grab ${
        isDragging ? "ring-2 ring-offset-2 ring-indigo-300 shadow-lg cursor-grabbing" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-400 text-white font-semibold">
          {initials || <FiUsers />}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{member.name}</p>
          <p className="text-xxs text-gray-400 tracking-wide">Drag to reassign</p>
        </div>
      </div>
      <div className="flex gap-2">
        <FiEdit3 className="text-gray-500 cursor-pointer" />
        <MdOutlineBlock
          className="text-red-500 cursor-pointer"
          onClick={() => onDeactivate(member)}
        />
      </div>
    </div>
  );
}

function ActiveMemberPreview({ member }) {
  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="pointer-events-none flex w-[260px] items-center justify-between rounded-2xl border border-indigo-200 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
      <div className="flex items-center gap-3 text-sm text-gray-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white font-semibold">
          {initials || <FiUsers />}
        </div>
        <div>
          <p className="text-sm font-semibold">{member.name}</p>
          <p className="text-xxs text-gray-500">Moving between squads</p>
        </div>
      </div>
      <MdOutlineBlock className="text-gray-300" />
    </div>
  );
}

// Team Card
function TeamCard({ team, onMemberDeactivate }) {
  const [showAll, setShowAll] = useState(false);
  const displayMembers = showAll ? team.members : team.members.slice(0, 5);
  const { isOver, setNodeRef } = useDroppable({
    id: `team-drop-${team.id}`,
    data: { teamId: team.id },
  });
  const completionWidth = Math.min(100, team.members.length * 12);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="space-y-3 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xxs tracking-[0.4em] uppercase text-white/70">Team</p>
            <h3 className="text-lg font-semibold tracking-tight">{team.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xxs font-semibold rounded-full px-3 py-1 uppercase tracking-wide ${
                team.active ? "bg-white/30 text-white" : "bg-white/20 text-white/70"
              }`}
            >
              {team.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xxs text-white/80">
          <div className="flex items-center gap-2">
            <FiUsers className="text-white/80" size={14} />
            <span className="font-semibold text-white">{team.lead}</span>
          </div>
          <span className="px-[10px] py-1 rounded-full bg-white/20 text-white/80">
            {team.members.length} member{team.members.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xxs text-white/70">
          <div className="flex-1 rounded-full bg-white/20">
            <div
              className="h-1 rounded-full bg-white transition-all duration-300"
              style={{ width: `${completionWidth}%` }}
            />
          </div>
          <span>{completionWidth}% filled</span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 px-5 py-5 transition ${
          isOver ? "bg-slate-100 border border-blue-200" : "bg-slate-50"
        }`}
      >
        <SortableContext items={displayMembers.map((member) => member.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 overflow-y-auto pr-1">
            {displayMembers.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                onDeactivate={onMemberDeactivate}
              />
            ))}
            {team.members.length === 0 && (
              <p className="text-xxs text-center text-gray-500 italic">
                No active members mapped yet.
              </p>
            )}
          </div>
        </SortableContext>
      </div>

      {team.members.length > 5 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 bg-white">
          <button
            className="text-xs font-medium text-blue-600 transition hover:text-blue-800"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : `Show All (${team.members.length})`}
          </button>
          <span className="text-xxs text-gray-500">
            Showing {displayMembers.length} of {team.members.length}
          </span>
        </div>
      )}
    </div>
  );
}

// Main Teams Page
export default function TeamsPage() {
  const [teams, setTeams] = useState([
    {
      id: "team-1",
      name: "Product Innovation",
      lead: "Ahmad Khan",
      active: true,
      members: [
        { id: "m1", name: "Sara Ali" },
        { id: "m2", name: "Omar Malik" },
        { id: "m3", name: "Bilal Shah" },
        { id: "m4", name: "Fatima Noor" },
        { id: "m5", name: "Hina Javed" },
        { id: "m6", name: "Usman Riaz" },
      ],
    },
    {
      id: "team-2",
      name: "Customer Experience",
      lead: "Ayesha Siddiqui",
      active: true,
      members: [
        { id: "m7", name: "Hina Javed" },
        { id: "m8", name: "Usman Riaz" },
      ],
    },
    {
      id: "team-3",
      name: "HR Operations",
      active: false,
      lead: "Sara Ali",
      members: [
        { id: "m9", name: "Omar Malik" },
        { id: "m10", name: "Bilal Shah" },
      ],
    },
  ]);

  const [search, setSearch] = useState("");
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [deactivateMember, setDeactivateMember] = useState(null);
  const [draggingMemberId, setDraggingMemberId] = useState(null);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamLead, setNewTeamLead] = useState("");
  const [newTeamActive, setNewTeamActive] = useState(true);

  const openAddTeamModal = () => setIsAddTeamOpen(true);
  const closeAddTeamModal = () => setIsAddTeamOpen(false);
  const handleSaveNewTeam = () => {
    if (!newTeamName.trim()) return;
    setTeams((prev) => [
      ...prev,
      {
        id: `team-${prev.length + 1}`,
        name: newTeamName.trim(),
        lead: newTeamLead.trim() || "TBD",
        active: newTeamActive,
        members: [],
      },
    ]);
    setNewTeamName("");
    setNewTeamLead("");
    setNewTeamActive(true);
    setIsAddTeamOpen(false);
  };

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ Wrap handlers in useCallback to fix warning
  const handleDragStart = useCallback(({ active }) => {
    setDraggingMemberId(active.id);
  }, []);

  const handleDragCancel = useCallback(() => {
    setDraggingMemberId(null);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setDraggingMemberId(null);
      if (!over || active.id === over.id) return;

      const findTeamIndex = (memberId) =>
        teams.findIndex((team) => team.members.some((member) => member.id === memberId));

      const getTeamIndexFromOver = (overId) => {
        if (!overId) return -1;
        if (overId.startsWith("team-drop-")) {
          const teamId = overId.replace("team-drop-", "");
          return teams.findIndex((team) => team.id === teamId);
        }
        return findTeamIndex(overId);
      };

      const activeTeamIndex = findTeamIndex(active.id);
      const overTeamIndex = getTeamIndexFromOver(over.id);
      if (activeTeamIndex === -1 || overTeamIndex === -1) return;

      const updatedTeams = [...teams];
      const sourceTeam = updatedTeams[activeTeamIndex];
      const activeMemberIndex = sourceTeam.members.findIndex((member) => member.id === active.id);
      const activeMember = sourceTeam.members[activeMemberIndex];
      if (activeMemberIndex === -1 || !activeMember) return;

      if (activeTeamIndex === overTeamIndex) {
        const overIsTeamContainer = over.id.startsWith("team-drop-");
        if (overIsTeamContainer) {
          const newMembers = [...sourceTeam.members];
          newMembers.splice(activeMemberIndex, 1);
          newMembers.push(activeMember);
          updatedTeams[activeTeamIndex] = { ...sourceTeam, members: newMembers };
        } else {
          const targetIndex = sourceTeam.members.findIndex((member) => member.id === over.id);
          if (targetIndex === -1) return;
          const newMembers = arrayMove(sourceTeam.members, activeMemberIndex, targetIndex);
          updatedTeams[activeTeamIndex] = { ...sourceTeam, members: newMembers };
        }
      } else {
        const targetTeam = updatedTeams[overTeamIndex];
        const targetMemberIndex = over.id.startsWith("team-drop-")
          ? targetTeam.members.length
          : targetTeam.members.findIndex((member) => member.id === over.id);

        const sourceMembers = [...sourceTeam.members];
        sourceMembers.splice(activeMemberIndex, 1);

        const targetMembers = [...targetTeam.members];
        const insertAt = targetMemberIndex === -1 ? targetMembers.length : targetMemberIndex;
        targetMembers.splice(insertAt, 0, activeMember);

        updatedTeams[activeTeamIndex] = { ...sourceTeam, members: sourceMembers };
        updatedTeams[overTeamIndex] = { ...targetTeam, members: targetMembers };
      }

      setTeams(updatedTeams);
    },
    [teams]
  );

  // Filtered teams
  const filteredTeams = useMemo(() => {
    if (!search) return teams;
    return teams.map((t) => ({
      ...t,
      members: t.members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter((t) => t.members.length > 0 || t.name.toLowerCase().includes(search.toLowerCase()));
  }, [teams, search]);

  const totalMembers = useMemo(
    () => teams.reduce((sum, team) => sum + team.members.length, 0),
    [teams]
  );
  const activeMembers = useMemo(
    () => teams.reduce((sum, team) => sum + (team.active ? team.members.length : 0), 0),
    [teams]
  );
  const activeTeams = useMemo(
    () => teams.filter((team) => team.active).length,
    [teams]
  );
  const inactiveTeams = teams.length - activeTeams;
  const resourceLoad = totalMembers ? Math.round((activeMembers / totalMembers) * 100) : 0;
  const inactiveMembers = Math.max(totalMembers - activeMembers, 0);
  const statsSummary = [
    {
      title: "Active Teams",
      value: activeTeams,
      description: `${activeMembers} members active`,
      icon: <FiUserCheck className="text-green-600 text-xl" />,
    },
    {
      title: "Inactive Teams",
      value: inactiveTeams,
      description: `${inactiveMembers} members idle`,
      icon: <FiUserMinus className="text-amber-500 text-xl" />,
    },
    {
      title: "Members",
      value: totalMembers,
      description: `${totalMembers} seats occupied`,
      icon: <FiUsers className="text-sky-600 text-xl" />,
    },
    {
      title: "Resource Load",
      value: `${resourceLoad}%`,
      description: `${resourceLoad}% of members active`,
      icon: <FiUsers className="text-indigo-600 text-xl" />,
    },
  ];
  const activeDragMember = useMemo(() => {
    if (!draggingMemberId) return null;
    for (const team of teams) {
      const found = team.members.find((member) => member.id === draggingMemberId);
      if (found) return found;
    }
    return null;
  }, [teams, draggingMemberId]);

  return (
    <Layout>
     
        <div className=" ">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Teams</h2>
              <p className="text-xxs text-gray-500">
                Organize squads, review skill gaps, and manage membership effortlessly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full sm:w-auto">
                <SearchBar
                  placeholder="Search teams or members..."
                  onSearch={(value) => setSearch(value)}
                />
              </div>
              <Button variant="success" onClick={openAddTeamModal}>
                Add Team
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsSummary.map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xxs font-medium text-gray-600">{stat.title}</h3>
                  {stat.icon}
                </div>
                <p className="mt-3 text-base font-semibold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-4 p-4 bg-white w-full rounded-lg shadow-md border border-gray-200">
            {filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onMemberDeactivate={(member) => {
                  setDeactivateMember(member);
                  setIsReasonOpen(true);
                }}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ drop: { duration: 150 } }}>
            <ActiveMemberPreview member={activeDragMember} />
          </DragOverlay>
        </DndContext>

        <ReasonModal
          isOpen={isReasonOpen}
          title="Deactivate Member"
          onClose={() => setIsReasonOpen(false)}
          variant="danger"
          submitLabel="Deactivate"
          reasonTitle={`Provide reason to deactivate ${deactivateMember?.name}`}
        />
        {isAddTeamOpen && (
          <Modal width="w-11/12 md:w-5/12">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Add Team</h3>
                <p className="text-xxs text-gray-500 mt-1">
                  Capture the squad name, lead, and whether the team should be active.
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  label="Team name"
                  placeholder="e.g., Customer Experience"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
                <Input
                  label="Team lead"
                  placeholder="Team lead name"
                  value={newTeamLead}
                  onChange={(e) => setNewTeamLead(e.target.value)}
                />
                <div className="flex">
                  <span className="text-xxs me-4 text-gray-600">Active</span>
                  <ToggleSwitch checked={newTeamActive} onChange={setNewTeamActive} />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="cancel" type="button" onClick={closeAddTeamModal}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="button"
                  onClick={handleSaveNewTeam}
                  disabled={!newTeamName.trim()}
                >
                  Save Team
                </Button>
              </div>
            </div>
          </Modal>
        )}
      
    </Layout>
  );
}
