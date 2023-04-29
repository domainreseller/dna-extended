<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 14.04.2023 03:59
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */


$latest_domains = Illuminate\Database\Capsule\Manager::table('mod_dnaextended_domains')
                                   ->where('reseller', $dnasettings['API_UserName'])
                                   ->orderBy('id', 'desc')
                                   ->limit(5)
                                   ->get();

$all_incoming_count = Illuminate\Database\Capsule\Manager::table('mod_dnaextended_domains')
                                   ->where('reseller', $dnasettings['API_UserName'])
                                   ->where('status', 'WaitingForIncomingTransfer')
                                   ->count();

$latest_incoming = Illuminate\Database\Capsule\Manager::table('mod_dnaextended_domains')
                                   ->where('reseller', $dnasettings['API_UserName'])
                                   ->where('status', 'WaitingForIncomingTransfer')
                                   ->orderBy('id', 'desc')
                                   ->limit(5)
                                   ->get();

$all_outgoing_count = Illuminate\Database\Capsule\Manager::table('mod_dnaextended_domains')
                                   ->where('reseller', $dnasettings['API_UserName'])
                                   ->where('status', 'WaitingForOutgoingTransfer')
                                   ->count();

$latest_outgoing = Illuminate\Database\Capsule\Manager::table('mod_dnaextended_domains')
                                   ->where('reseller', $dnasettings['API_UserName'])
                                   ->where('status', 'WaitingForOutgoingTransfer')
                                   ->orderBy('id', 'desc')
                                   ->limit(5)
                                   ->get();

$lastcronrun = Illuminate\Database\Capsule\Manager::table('tblconfiguration')
                                                  ->where('setting', 'DNADomainSyncLastPage')
                                                  ->first();






$controlleroutput['domains'] = $latest_domains;

$controlleroutput['latestcron'] = $lastcronrun->updated_at;

$controlleroutput['incoming'] = $latest_incoming;
$controlleroutput['incoming_count'] = $all_incoming_count;

$controlleroutput['outgoing'] = $latest_outgoing;
$controlleroutput['outgoing_count'] = $all_outgoing_count;

